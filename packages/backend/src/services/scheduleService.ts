import { inject, injectable } from "inversify";
import { LogUtils } from "@/utils/logUtils";
import type { JobCallback } from "node-schedule";
import schedule from "node-schedule";
import type { LeetCodeService } from "@/services/leetCodeService";
import { ServiceNames } from "@/constant/ServiceNames";

@injectable()
export class ScheduleService {
  private jobQueue: [schedule.RecurrenceRule, JobCallback][] = [];
  private fetchingLeetCodeQuestionsLocking = false;
  constructor(
    @inject<LeetCodeService>(ServiceNames.LeetCodeService)
    private readonly leetCodeService: LeetCodeService,
  ) {
    const rule = new schedule.RecurrenceRule();
    rule.second = [0, 10, 20, 30, 40, 50];
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
    try {
      const questions = await this.leetCodeService.fetchLeetCodeQuestions();
      await this.leetCodeService.updateQuestions(questions);
    } finally {
      this.fetchingLeetCodeQuestionsLocking = false;
    }
  }
}
