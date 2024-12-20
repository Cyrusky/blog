import { inject, injectable } from "inversify";
import { BorisRouter } from "@/router";
import { ControllerNames, ServiceNames } from "@/constant/ServiceNames";
import type { Context } from "koa";
import type { LeetCodeService } from "@/services/leetCodeService";
import { ResponseUtil } from "@/utils/responseUtil";

@injectable()
@BorisRouter.Controller("/leetcode", ControllerNames.LeetCodeController)
export class LeetCodeController {
  constructor(
    @inject<LeetCodeService>(ServiceNames.LeetCodeService)
    private readonly leetCodeService: LeetCodeService,
  ) {}

  @BorisRouter.Get("/")
  async listLeetCodeQuestions(ctx: Context) {
    const page = parseInt(ctx.query.page as string) || 1;
    const pageSize = parseInt(ctx.query.pageSize as string) || 10;
    const sortKey = ctx.query.sortKey as string | undefined;
    const sortOrder = ctx.query.sortOrder as string | undefined;
    const result = await this.leetCodeService.listLeetCodeQuestions(
      page,
      pageSize,
      sortKey,
      sortOrder,
    );
    ctx.body = ResponseUtil.success({
      questions: result.questions,
      total: result.total,
    });
  }
}
