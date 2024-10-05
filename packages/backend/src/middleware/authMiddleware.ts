import { Context, Next } from "koa";
import { JwtUtils } from "@/utils/jwtUtils";
import { ResponseUtil } from "@/utils/responseUtil";
import { IOC } from "@/container";
import { UserService } from "@/services/userService";
import { ServiceNames } from "@/constant/ServiceNames";
import { Configs } from "@/config";

export const authMiddleware = async (ctx: Context, next: Next) => {
  if (
    Configs.authBypass.some((path) => {
      return path.test(ctx.path);
    })
  ) {
    await next();
    return;
  }

  const token = ctx.request.headers["authorization"] || "";
  const userInfo = JwtUtils.verifyToken(token);
  if (!userInfo) {
    ctx.body = ResponseUtil.unAuthorized();
    return;
  }
  const userService = IOC.get<UserService>(ServiceNames.UserService);
  const user = await userService.getUser(userInfo.username);
  if (!user) {
    ctx.body = ResponseUtil.unAuthorized();
    return;
  }
  await next();
};
