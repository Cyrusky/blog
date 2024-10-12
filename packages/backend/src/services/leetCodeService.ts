import { inject, injectable } from "inversify";
import type { DB } from "@/db";
import { ServiceNames } from "@/constant/ServiceNames";
import { LogUtils } from "@/utils/logUtils";
import type { FetchedLeetCodeQuestion } from "@/types/router";
import { GraphQLUtils, LeetCodeRegion } from "@/utils/graphQLUtils";
import { GET_LEETCODE_CHINESE_NAME } from "@/constant/graphQL";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Configs } from "@/config";

@injectable()
export class LeetCodeService {
  constructor(@inject<DB>(ServiceNames.Database) private readonly db: DB) {}

  async listLeetCodeQuestions(
    page: number = 1,
    pageSize: number = 10,
    sortKey = "",
    sortOrder = "",
  ) {
    // eslint-disable-next-line
    const condition: any = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {},
      include: {
        tags: true,
        records: {
          orderBy: {
            records: "desc",
          },
        },
      },
    };
    if (sortKey && sortOrder) {
      condition["orderBy"] = {
        [sortKey]: sortOrder === "ascend" ? "asc" : "desc",
      };
    }
    const questions =
      await this.db.client.bor_leetcode_questions.findMany(condition);
    const total = await this.db.client.bor_leetcode_questions.count();
    return {
      questions,
      total,
    };
  }

  async translateQuestion(autoId: number, titleSlug: string) {
    const cnTitle = await this.getQuestionCNTitleBySlug(titleSlug);
    if (!cnTitle) {
      await this.increaseQuestionTranslateFailCount(autoId);
    } else {
      await this.updateQuestionCNTitle(autoId, cnTitle);
    }
  }

  async updateQuestions(questions: FetchedLeetCodeQuestion[]) {
    const allDatabaseQuestions =
      await this.db.client.bor_leetcode_questions.findMany({
        include: {
          tags: true,
        },
      });
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const dbQuestion = allDatabaseQuestions.find((q) => {
        return q.title_slug === question.titleSlug;
      });

      if (!dbQuestion) {
        await this.updateQuestion(question);
        continue;
      }

      if (!dbQuestion.title_cn) {
        await this.updateQuestion(question);
        continue;
      }

      if (
        dbQuestion.ac_rate?.toFixed(2) !== question.acRate.toFixed(2) ||
        dbQuestion.difficulty !== question.difficulty ||
        dbQuestion.question_frontend_id !== question.questionFrontendId ||
        dbQuestion.is_paid_only !== question.isPaidOnly ||
        dbQuestion.title !== question.title
      ) {
        await this.updateQuestion(question);
        continue;
      }

      if (dbQuestion.tags.length !== question.topicTags.length) {
        await this.updateQuestion(question);
        continue;
      }

      LogUtils.log(`Skip question ${question.titleSlug}.`);
    }
  }

  public async fetchLeetCodeQuestions() {
    const result = await axios.get(
      `https://alfa-leetcode-api.onrender.com/problems?limit=${Configs.leetcode.maxCount}`,
      {
        timeout: 30000,
      },
    );
    const data = result.data;
    const total = data.totalQuestions as number;
    const questions = data.problemsetQuestionList as FetchedLeetCodeQuestion[];
    return {
      questions,
      total,
    };
  }

  private async updateQuestionCNTitle(autoId: number, cn_title: string) {
    try {
      await this.db.client.bor_leetcode_questions.update({
        where: {
          id_auto: autoId,
        },
        data: {
          title_cn: cn_title,
        },
      });
      return true;
      // eslint-disable-next-line
    } catch (e: any) {
      LogUtils.error("updateQuestionCNTitle", e.message);
      return false;
    }
  }

  private async getQuestionCNTitleBySlug(title_slug: string) {
    try {
      const result = await GraphQLUtils.queryGraphQL(
        GET_LEETCODE_CHINESE_NAME,
        {
          titleSlug: title_slug,
        },
        "questionTranslations",
        LeetCodeRegion.CN,
      );
      return result.data.data.question.translatedTitle || "";
      // eslint-disable-next-line
    } catch (e: any) {
      LogUtils.error("getQuestionCNTitleBySlug", e.message);
      return "";
    }
  }

  private async increaseQuestionTranslateFailCount(autoId: number) {
    try {
      const question = await this.db.client.bor_leetcode_questions.findUnique({
        where: {
          id_auto: autoId,
        },
      });
      if (!question) {
        return false;
      }
      await this.db.client.bor_leetcode_questions.update({
        where: {
          id_auto: autoId,
        },
        data: {
          translate_try_times: question.translate_try_times + 1,
        },
      });
      return true;
      // eslint-disable-next-line
    } catch (e: any) {
      LogUtils.error("increaseQuestionTranslateFailCount", e.message);
      return false;
    }
  }

  private async updateQuestion(question: FetchedLeetCodeQuestion) {
    LogUtils.log(`Question ${question.titleSlug} is up to date.`);
    try {
      const updatedQuestion =
        await this.db.client.bor_leetcode_questions.upsert({
          where: {
            title_slug: question.titleSlug,
          },
          update: {
            ac_rate: question.acRate,
            difficulty: question.difficulty,
            question_frontend_id: question.questionFrontendId,
            is_paid_only: question.isPaidOnly,
            title: question.title,
            tags: {
              set: [],
            },
          },
          create: {
            ac_rate: question.acRate,
            question_id: uuid(),
            difficulty: question.difficulty,
            question_frontend_id: question.questionFrontendId,
            is_paid_only: question.isPaidOnly,
            title: question.title,
            title_slug: question.titleSlug,
          },
        });
      const tagIds: number[] = [];
      for (const tag of question.topicTags) {
        const result = await this.db.client.bor_leetcode_topic_tags.upsert({
          where: {
            slug: tag.slug,
          },
          create: {
            tag_id: tag.id,
            name: tag.name,
            slug: tag.slug,
          },
          update: {
            tag_id: tag.id,
            name: tag.name,
          },
        });
        tagIds.push(result.id_auto);
      }
      await this.db.client.bor_leetcode_questions.update({
        where: {
          id_auto: updatedQuestion.id_auto,
        },
        data: {
          tags: {
            connect: tagIds.map((id_auto) => ({
              id_auto,
            })),
          },
        },
      });

      if (
        updatedQuestion &&
        !updatedQuestion.title_cn &&
        updatedQuestion.title_slug &&
        updatedQuestion.translate_try_times < 5
      ) {
        await this.translateQuestion(
          updatedQuestion.id_auto,
          updatedQuestion.title_slug,
        );
      }
      return updatedQuestion;
      // eslint-disable-next-line
    } catch (e: any) {
      LogUtils.error("updateQuestion", e.message);
    }
  }
}
