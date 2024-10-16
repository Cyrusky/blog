import { inject, injectable } from "inversify";
import type { DB } from "@/db";
import { ServiceNames } from "@/constant/ServiceNames";
import axios from "axios";
import { Configs } from "@/config";
import { LogUtils } from "@/utils/logUtils";

@injectable()
export class ThingsService {
  private historyKey: string = "";
  private latestServerIndex: number = 0;
  private apiClient = axios.create({
    baseURL: "https://cloud.culturedcode.com",
    timeout: 5000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  constructor(@inject<DB>(ServiceNames.Database) private readonly db: DB) {
    this.loginThings().then(() => {
      LogUtils.log("Things login success");
      this.getThingsHistoryInfo().then(() => {
        LogUtils.log("Things history info success");
        setInterval(() => {
          this.getThingsOperationHistory();
        }, 10000);
      });
    });
  }

  private async loginThings() {
    const config = await this.db.client.bor_config.findUnique({
      where: {
        key: Configs.things.configKeys.historyKey,
      },
    });
    if (config && config.value) {
      this.historyKey = config.value;
      return;
    }
    const result = await this.apiClient.get(
      `/version/1/account/${Configs.things.email}`,
      {
        headers: {
          Authorization: `Password ${Configs.things.password}`,
        },
      },
    );
    this.historyKey = result.data["history-key"];
    await this.db.client.bor_config.upsert({
      where: {
        key: Configs.things.configKeys.historyKey,
      },
      update: {
        value: this.historyKey,
      },
      create: {
        key: Configs.things.configKeys.historyKey,
        value: this.historyKey,
      },
    });
  }

  private async getThingsHistoryInfo() {
    const config = await this.db.client.bor_config.findUnique({
      where: {
        key: Configs.things.configKeys.latestServerIndex,
      },
    });
    if (config && config.value) {
      this.latestServerIndex = parseInt(config.value);
      return;
    }
    const result = await this.apiClient.get(
      `/version/1/history/${this.historyKey}`,
      {},
    );
    this.latestServerIndex = result.data["latest-server-index"];
    await this.db.client.bor_config.upsert({
      where: {
        key: Configs.things.configKeys.latestServerIndex,
      },
      update: {
        value: `${this.latestServerIndex}`,
      },
      create: {
        key: Configs.things.configKeys.latestServerIndex,
        value: `${this.latestServerIndex}`,
      },
    });
  }

  private async getThingsOperationHistory() {
    try {
      const result = await this.apiClient.get(
        `/version/1/history/${this.historyKey}/items?start-index=${this.latestServerIndex}`,
      );
      console.log(result);
    } catch (e: unknown) {
      console.log(e);
    }
  }
}
