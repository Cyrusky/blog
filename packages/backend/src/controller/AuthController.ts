import { inject, injectable } from "inversify";
import { BorisRouter } from "@/router";
import { ResponseUtil } from "@/utils/responseUtil";
import { Context } from "koa";
import { ControllerNames, ServiceNames } from "@/constant/ServiceNames";
import { AuthService } from "@/services/authService";

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
      ctx.body = ResponseUtil.success({ token: authResult });
    }
  }
}
