import { inject, injectable } from "inversify";
import type { DB } from "@/db";
import { ServiceNames } from "@/constant/ServiceNames";
import { LogUtils } from "@/utils/logUtils";
import type { FetchedLeetCodeQuestion } from "@/types/router";
import { LeetCodeQuestionStatus } from "@/types/router";
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
      }
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

  async initDatabase() {
    const finishedQuestions = [
      "9ef4595c-75e6-42dc-80f4-f55e7d78b798",
      "581cc1c7-8985-4fcd-8a37-c25f4e11bbb6",
      "01d04ae3-423c-4ce8-b346-18e78fe8848a",
      "521ec9e3-02e2-4f16-9a5c-0d17f7bab5b8",
      "b330997f-a661-4641-bd9f-7a979e2d3d15",
      "3279ccee-baf1-4f00-9c62-76f9c7677fed",
      "d052b9b3-4ce5-4a33-8d8f-a2ca01528610",
      "c96ec0de-4a09-4f52-8871-c7b091f8fb8e",
      "b60d4a15-9410-416a-a4dc-8ea22cf7635c",
      "64d8aeef-84e4-4082-9d69-9895df3e3a2f",
      "ea75bd6c-9774-4ace-b4c8-b2463ea75dbb",
      "d6d0ee29-e30e-45f0-b845-db86213aacbd",
      "81722aac-ec53-4ce6-8656-4125747a3759",
      "2d329464-f46c-43da-970d-09bb41f29eb5",
      "052eee94-e635-4565-a1f6-7ffb43af65cb",
      "82c71413-837f-4027-9979-7526831a397f",
      "2ed29a99-6ab5-437f-8072-14b81900804f",
      "39e3bd85-d656-46b2-b467-3e200177e02c",
      "fc8cdd6a-2a39-4e67-92ad-152bd73f6f2f",
      "dbcbae31-3b7b-4f11-b6db-eaf0932ebf4b",
      "96eb4892-7ea3-420b-a348-76a62a3b7be6",
      "6a1b94b2-5f2d-4444-9916-b020deacaa6c",
      "496cd7f2-73c1-4761-b1e2-4dd89ea7f468",
      "ed024a25-c29f-4bf8-9c81-9de71a26d1e3",
    ];

    const todoQuestions = [
      "d491c151-e1b8-4576-a7ba-e43c7ba5c948",
      "f45c7064-0639-41ff-8991-8507b5fa6fc1",
      "e9cd60de-0962-4c1b-866d-ff950c8a2e92",
    ];

    for (const question of [...finishedQuestions, ...todoQuestions]) {
      const dbQuestion = await this.db.client.bor_leetcode_questions.findUnique(
        {
          where: {
            question_id: question,
          },
          include: {
            records: true,
          },
        },
      );
      if (dbQuestion && dbQuestion.records.length === 0) {
        await this.db.client.bor_leetcode_questions.update({
          where: {
            question_id: question,
          },
          data: {
            records: {
              create: {
                question_id: question,
                question_title: dbQuestion.title,
                status: todoQuestions.includes(question)
                  ? LeetCodeQuestionStatus.InProgress
                  : LeetCodeQuestionStatus.Resolved,
                record_time: new Date(),
              },
            },
          },
        });
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
