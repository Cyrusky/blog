import { Context, Next } from "koa";
import { LogUtils } from "@/utils/logUtils";

export const logMiddleware = async (ctx: Context, next: Next) => {
  LogUtils.log(`Access: ${ctx.method} ${ctx.url}`);
  await next();
};
