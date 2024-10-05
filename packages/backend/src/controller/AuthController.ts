import { inject, injectable } from "inversify";
import { BorisRouter } from "@/router";
import { ResponseUtil } from "@/utils/responseUtil";
import type { Context } from "koa";
import type { AuthService } from "@/services/authService";
import type { IsLoginResponse, LoginResponse } from "@boris/common";
import { ControllerNames, ServiceNames } from "@/constant/ServiceNames";
import { AUTH_TOKEN_HEADER_KEY } from "@boris/common/src/constant";

export interface AuthLoginInfo {
  username: string;
  password: string;
}

@injectable()
@BorisRouter.Controller("/auth", ControllerNames.AuthController)
export class AuthController {
  constructor(
    @inject<AuthService>(ServiceNames.AuthService)
    private readonly authService: AuthService,
  ) {}

  @BorisRouter.Post("/login")
  async login(ctx: Context) {
    const loginInfo = ctx.request.body as AuthLoginInfo;
    const authResult = await this.authService.login(
      loginInfo.username,
      loginInfo.password,
    );
    if (!authResult) {
      ctx.body = ResponseUtil.fail(401, "Invalid username or password");
      return;
    } else {
      ctx.body = ResponseUtil.success<LoginResponse>({ token: authResult });
    }
  }

  @BorisRouter.Get("/isLogin")
  async isLogin(ctx: Context) {
    const token =
      (ctx.request.headers[AUTH_TOKEN_HEADER_KEY.toLowerCase()] as string) ||
      "";
    const isLogin = await this.authService.verifyToken(token);
    if (!isLogin) {
      ctx.body = ResponseUtil.success<IsLoginResponse>({ isLogin: false });
    } else {
      ctx.body = ResponseUtil.success<IsLoginResponse>({ isLogin: true });
    }
  }
}
