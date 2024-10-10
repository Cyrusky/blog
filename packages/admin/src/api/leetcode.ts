import type { LeetCodeQuestion } from "@boris/common";
import { ApiRequest } from "@/util/apiRequest.ts";

const LeetCodeUrls = {
  listLeetCodeQuestions: "/leetcode/",
};

export class LeetcodeAPI {
  static async listLeetCodeQuestions(
    params: {
      page: number;
      pageSize?: number;
    },
    sort: Record<string, string | null>,
  ): Promise<{
    questions: LeetCodeQuestion[];
    total: number;
  }> {
    const sortQuery: Record<string, string> = {};
    for (const key of Object.keys(sort)) {
      if (sort[key]) {
        sortQuery.sortKey = key;
        sortQuery.sortOrder = sort[key];
        break;
      }
    }
    return ApiRequest.get(LeetCodeUrls.listLeetCodeQuestions, {
      ...params,
      ...sortQuery,
    });
  }

  static async translateQuestion(
    questionId: number,
  ): Promise<LeetCodeQuestion> {
    return ApiRequest.get(`/leetcode/translate/${questionId}`);
  }
}
