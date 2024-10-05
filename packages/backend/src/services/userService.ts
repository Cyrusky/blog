import { inject, injectable } from "inversify";
import { DB } from "@/db";
import { ServiceNames } from "@/constant/ServiceNames";

@injectable()
export class UserService {
  constructor(@inject<DB>(ServiceNames.Database) private readonly db: DB) {}
  async getUser(username: string) {
    return this.db.client.bor_user.findFirst({
      where: {
        username: username,
      },
    });
  }

  getLoginUser(username: string, digestPassword: string) {
    return this.db.client.bor_user.findFirst({
      where: {
        username: username,
        password: digestPassword,
      },
    });
  }
}
