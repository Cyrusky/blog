import type { LeetCodeQuestion } from "@boris/common";
import { ApiRequest } from "@/util/apiRequest.ts";

const LeetCodeUrls = {
  listLeetCodeQuestions: "/leetcode/",
};

export class LeetcodeAPI {
  static async listLeetCodeQuestions(params: {
    page: number;
    pageSize?: number;
  }): Promise<{
    questions: LeetCodeQuestion[];
    total: number;
  }> {
    return ApiRequest.get(LeetCodeUrls.listLeetCodeQuestions, params);
  }

  static async translateQuestion(
    questionId: number,
  ): Promise<LeetCodeQuestion> {
    return ApiRequest.get(`/leetcode/translate/${questionId}`);
  }
}
