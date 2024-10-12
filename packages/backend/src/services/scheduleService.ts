import { inject, injectable } from "inversify";
import { LogUtils } from "@/utils/logUtils";
import type { JobCallback } from "node-schedule";
import schedule from "node-schedule";
import type { LeetCodeService } from "@/services/leetCodeService";
import { ServiceNames } from "@/constant/ServiceNames";
import { FeiShuUtils } from "@/utils/FeishuUtils";
import { AnyType } from "@/types/router";

@injectable()
export class ScheduleService {
  private jobQueue: [schedule.RecurrenceRule, JobCallback][] = [];
  private fetchingLeetCodeQuestionsLocking = false;
  constructor(
    @inject<LeetCodeService>(ServiceNames.LeetCodeService)
    private readonly leetCodeService: LeetCodeService,
  ) {
    const rule = new schedule.RecurrenceRule();
    rule.hour = [0, 6, 12, 18];
    this.jobQueue.push([
      rule,
      this.fetchingLeetCodeQuestionsScheduler.bind(this),
    ]);
  }

  init() {
    LogUtils.log("ScheduleService init");
    this.jobQueue.forEach((job) => {
      schedule.scheduleJob(job[0], job[1]);
    });
  }

  async fetchingLeetCodeQuestionsScheduler() {
    if (this.fetchingLeetCodeQuestionsLocking) {
      return;
    }
    this.fetchingLeetCodeQuestionsLocking = true;
    LogUtils.log(`Fetching question task start.`);
    await FeiShuUtils.sendNotification("开始刷新题库", "");
    try {
      const questions = await this.leetCodeService.fetchLeetCodeQuestions();
      await this.leetCodeService.updateQuestions(questions);
    } catch (e: AnyType) {
      LogUtils.error(`Fetching question task error: ${e}`);
      await FeiShuUtils.sendNotification("刷新题库失败", e);
    } finally {
      await FeiShuUtils.sendNotification("刷新题库完成", "");
      this.fetchingLeetCodeQuestionsLocking = false;
    }
  }
}
