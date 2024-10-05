import { injectable } from "inversify";
import { PrismaClient } from "@/db/client";

@injectable()
export class DB {
  public client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }
}
