import { inject, injectable } from "inversify";
import type { UserService } from "@/services/userService";
import { ServiceNames } from "@/constant/ServiceNames";
import { LogUtils } from "@/utils/logUtils";
import { SHAUtils } from "@/utils/SHAUtils";
import { JwtUtils } from "@/utils/jwtUtils";

@injectable()
export class AuthService {
  constructor(
    @inject<UserService>(ServiceNames.UserService)
    private userService: UserService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.getUser(username);
    if (!user) {
      LogUtils.debug(`User [${username}] not found`);
      return null;
    }
    const digestPassword = SHAUtils.digest(password);
    if (user.password !== digestPassword) {
      LogUtils.debug(`Password [${username}:${password}] not match`);
      return null;
    }
    return JwtUtils.generateToken({
      username: user.username!,
    });
  }

  async verifyToken(token: string) {
    return JwtUtils.verifyToken(token);
  }
}
