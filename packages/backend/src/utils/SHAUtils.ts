import { createHash } from "crypto";

export class SHAUtils {
  static digest(data: string): string {
    return createHash("sha256").update(data).digest("base64");
  }
}
