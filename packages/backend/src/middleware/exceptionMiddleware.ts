/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseUtil } from "@/utils/responseUtil";
import { Context, Next } from "koa";

export const exceptionMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = ResponseUtil.serverError((err as unknown as any).message);
  }
};
