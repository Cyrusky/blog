import { config } from "dotenv";
import * as process from "node:process";
import * as path from "node:path";

config();

export class Configs {
  static dev = process.env.NODE_ENV === "development";
  static port = process.env.PORT || 3000;
  static secretKeyDir =
    process.env.SECRET_KEY_PATH || path.join(__dirname, "../../secretKeys");
  static authBypass: RegExp[] = [
    /\//,
    /\/login/,
    /\/isLogin/,
    /\/register/,
    /\/favicon.ico/,
  ];
  static api = {
    prefix: "/api",
  };
  static FeiShuToken = process.env.FEISHU_TOKEN || "";
  static leetcode = {
    maxCount: 5000,
  };
  static things = {
    configKeys: {
      historyKey: "config.things.historyKey",
      latestServerIndex: "config.things.latestServerIndex",
    },
    email: process.env.THINGS_EMAIL || "",
    password: process.env.THINGS_PASSWORD || "",
  };
}
