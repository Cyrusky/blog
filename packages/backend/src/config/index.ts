import { config } from "dotenv";
import * as process from "node:process";
import * as path from "node:path";

config();

export class Configs {
  static port = process.env.PORT || 3000;
  static secretKeyDir =
    process.env.SECRET_KEY_PATH || path.join(__dirname, "../../secretKeys");
  static authBypass: RegExp[] = [
    /\//,
    /\/login/,
    /\/register/,
    /\/favicon.ico/,
  ];
  static api = {
    prefix: "/api",
  };
}
