import type { TokenUserInfo } from "@/types/router";
import jwt from "jsonwebtoken";
import { LogUtils } from "@/utils/logUtils";
import * as process from "node:process";
import { RandomUtils } from "@/utils/randomUtils";
import ms from "ms";

export class JwtUtils {
  static JWT_SECRET = process.env.JWT_SECRET || RandomUtils.getRandomString(32);
  static TOKEN_EXPIRE_IN = process.env.TOKEN_EXPIRE_IN || "1d";
  static generateToken(userinfo: TokenUserInfo): string {
    const number = ms(this.TOKEN_EXPIRE_IN);
    userinfo.expireAt = Date.now() + number;
    return jwt.sign(userinfo, JwtUtils.JWT_SECRET, {
      expiresIn: this.TOKEN_EXPIRE_IN,
    });
  }

  static verifyToken(token: string): TokenUserInfo | undefined {
    try {
      const userinfo = jwt.verify(token, JwtUtils.JWT_SECRET) as TokenUserInfo;
      if ((userinfo.expireAt || 0) < Date.now()) {
        LogUtils.error(`Token expired.`);
        return undefined;
      }
      return userinfo;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        LogUtils.error(`Token expired.`);
        return undefined;
      }
      LogUtils.error(`Token verify failed.`);
      return undefined;
    }
  }
}
