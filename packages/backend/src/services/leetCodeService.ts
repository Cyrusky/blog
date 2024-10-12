import { inject, injectable } from "inversify";
import type { DB } from "@/db";
import { ServiceNames } from "@/constant/ServiceNames";
import { LogUtils } from "@/utils/logUtils";
import type { LeetCodeQuestion } from "@/types/router";
import { GraphQLUtils, LeetCodeRegion } from "@/utils/graphQLUtils";
import {
  GET_LEETCODE_CHINESE_NAME,
  GET_LEETCODE_QUESTION_BY_PAGE,
} from "@/constant/graphQL";

const PAGE_SIZE = 50;

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

  async fetchLeetCodeQuestions() {
    let page = 1;
    const allQuestions: LeetCodeQuestion[] = [];
    while (true) {
      const { questions, total } =
        await this.fetchLeetCodeQuestionsByPage(page);
      LogUtils.trace(
        `Fetching leetcode questions page ${page}, ${page * PAGE_SIZE}/${total}`,
      );
      allQuestions.push(...questions);
      if (questions.length === 0) {
        break;
      }
      page += 1;
    }
    return allQuestions;
  }

  async updateQuestions(questions: LeetCodeQuestion[]) {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const updateResult = await this.updateQuestion(question);
      if (
        updateResult &&
        !updateResult.title_cn &&
        updateResult.title_slug &&
        updateResult.translate_try_times < 5
      ) {
        await this.translateQuestion(
          updateResult.id_auto,
          updateResult.title_slug,
        );
      }
    }
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

  private async fetchLeetCodeQuestionsByPage(pageNum: number) {
    const result = await GraphQLUtils.queryGraphQL(
      GET_LEETCODE_QUESTION_BY_PAGE,
      {
        categorySlug: "all-code-essentials",
        skip: (pageNum - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        filters: {},
      },
      "problemsetQuestionList",
    );
    return {
      questions: result.data.data.problemsetQuestionList.questions,
      total: result.data.data.problemsetQuestionList.total,
    };
  }

  private async updateQuestion(question: LeetCodeQuestion) {
    try {
      const updatedQuestion =
        await this.db.client.bor_leetcode_questions.upsert({
          where: {
            title_slug: question.titleSlug,
          },
          update: {
            ac_rate: question.acRate,
            difficulty: question.difficulty,
            question_frontend_id: question.frontendQuestionId,
            is_paid_only: question.paidOnly,
            title: question.title,
            tags: {
              set: [],
            },
          },
          create: {
            ac_rate: question.acRate,
            difficulty: question.difficulty,
            question_frontend_id: question.frontendQuestionId,
            is_paid_only: question.paidOnly,
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
      return updatedQuestion;
      // eslint-disable-next-line
    } catch (e: any) {
      LogUtils.error("updateQuestion", e.message);
    }
  }
}
