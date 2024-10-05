import { inject, injectable } from "inversify";
import type { DB } from "@/db";
import { ServiceNames } from "@/constant/ServiceNames";
import axios from "axios";

@injectable()
export class LeetCodeService {
  constructor(@inject<DB>(ServiceNames.Database) private readonly db: DB) {}

  async listLeetCodeQuestions(page: number = 1, pageSize: number = 10) {
    const condition = {
      take: pageSize,
      skip: (page - 1) * pageSize,
    };
    const questions =
      await this.db.client.bor_leetcode_questions.findMany(condition);
    const total = await this.db.client.bor_leetcode_questions.count();
    return {
      questions,
      total,
    };
  }

  async translateQuestion(titleSlug: number) {
    const question = await this.db.client.bor_leetcode_questions.findUnique({
      where: {
        id_auto: titleSlug,
      },
    });
    if (!question) {
      return undefined;
    }
    const result = await axios.post(
      "https://leetcode.com/graphql",
      {
        query:
          "query questionTranslations($titleSlug: String!) {question(titleSlug: $titleSlug) {translatedTitle}}",
        variables: {
          titleSlug: question.title_slug,
        },
        operationName: "questionTranslations",
      },
      {
        headers: {
          Host: "leetcode.cn",
          "Content-Type": "application/json",
        },
      },
    );
    await this.db.client.bor_leetcode_questions.update({
      where: {
        id_auto: question.id_auto,
      },
      data: { title_cn: result.data.data.question.translatedTitle },
    });
    question.title_cn = result.data.data.question.translatedTitle;
    return question;
  }
}
