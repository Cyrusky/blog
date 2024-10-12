import { inject, injectable } from "inversify";
import { LogUtils } from "@/utils/logUtils";
import type { JobCallback } from "node-schedule";
import schedule from "node-schedule";
import type { LeetCodeService } from "@/services/leetCodeService";
import { ServiceNames } from "@/constant/ServiceNames";
import { FeiShuUtils } from "@/utils/FeishuUtils";

@injectable()
export class ScheduleService {
  private jobQueue: [schedule.RecurrenceRule, JobCallback][] = [];
  private fetchingLeetCodeQuestionsLocking = false;
  private updatingLeetCodeQuestionsUUIDLocking = false;

  constructor(
    @inject<LeetCodeService>(ServiceNames.LeetCodeService)
    private readonly leetCodeService: LeetCodeService,
  ) {
    const fetchingRule = new schedule.RecurrenceRule();
    fetchingRule.hour = [0, 6, 12, 18];
    this.jobQueue.push([
      fetchingRule,
      this.fetchingLeetCodeQuestionsScheduler.bind(this),
    ]);
    const updatingRule = new schedule.RecurrenceRule();
    updatingRule.second = [0, 10, 20, 30, 40, 50];
    this.jobQueue.push([
      updatingRule,
      this.updatingLeetCodeQuestionsUUIDScheduler.bind(this),
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
    } catch (e: unknown) {
      LogUtils.error(`Fetching question task error: ${e}`);
      await FeiShuUtils.sendNotification("刷新题库失败", e as string);
    } finally {
      await FeiShuUtils.sendNotification("刷新题库完成", "");
      this.fetchingLeetCodeQuestionsLocking = false;
    }
  }
  // things:///show?id=d491c151-e1b8-4576-a7ba-e43c7ba5c948

  private async updatingLeetCodeQuestionsUUIDScheduler() {
    if (this.updatingLeetCodeQuestionsUUIDLocking) {
      return;
    }
    this.updatingLeetCodeQuestionsUUIDLocking = true;
    LogUtils.trace(`Updating question uuid task start.`);
    await this.leetCodeService.updateQuestionsUUID();
    LogUtils.trace(`Updating question uuid task end.`);
    this.updatingLeetCodeQuestionsUUIDLocking = false;
  }
}
