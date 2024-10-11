import { inject, injectable } from "inversify";
import type { DB } from "@/db";
import { ServiceNames } from "@/constant/ServiceNames";
import axios from "axios";
import { LogUtils } from "@/utils/logUtils";
import { AnyType } from "@/types/router";

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

  async listEnglishLeetCodeQuestions() {
    return this.db.client.bor_leetcode_questions.findMany({
      where: {
        title_cn: {
          equals: "",
        },
      },
    });
  }

  async translateQuestionByAutoIdAndSlug(id_auto: number, slug: string) {
    try {
      const cnTitle = await this.getQuestionCNTitleBySlug(slug);
      if (cnTitle) {
        await this.updateQuestionCNTitle(id_auto, cnTitle);
      }
      return cnTitle;
    } catch (e: AnyType) {
      LogUtils.error("translateQuestionByAutoIdAndSlug", e.message);
      return undefined;
    }
  }

  async translateQuestionByAutoId(autoId: number) {
    const question = await this.db.client.bor_leetcode_questions.findUnique({
      where: {
        id_auto: autoId,
      },
    });
    if (!question || !question.title_slug) {
      return undefined;
    }
    const cnTitle = await this.getQuestionCNTitleBySlug(question.title_slug);
    await this.updateQuestionCNTitle(autoId, cnTitle);
    question.title_cn = cnTitle;
    return question;
  }

  private async updateQuestionCNTitle(autoId: number, cn_title: string) {
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
          title_cn: cn_title,
        },
      });
      return true;
    } catch (e: AnyType) {
      LogUtils.error("updateQuestionCNTitle", e.message);
      return false;
    }
  }

  private async getQuestionCNTitleBySlug(title_slug: string) {
    try {
      const result = await axios.post(
        "https://leetcode.com/graphql",
        {
          query:
            "query questionTranslations($titleSlug: String!) {question(titleSlug: $titleSlug) {translatedTitle}}",
          variables: {
            titleSlug: title_slug,
          },
          operationName: "questionTranslations",
        },
        {
          headers: {
            Host: "leetcode.cn",
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
          },
        },
      );
      return result.data.data.question.translatedTitle;
    } catch (e: AnyType) {
      LogUtils.error("getQuestionCNTitleBySlug", e.message);
      return "";
    }
  }
}
