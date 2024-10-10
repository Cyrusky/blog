import * as bcrypt from "bcrypt";

export class SHAUtils {
  static async digest(data: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(data, saltRounds);
  }
}
