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
  private translating = false;
  constructor(
    @inject<LeetCodeService>(ServiceNames.LeetCodeService)
    private readonly leetCodeService: LeetCodeService,
  ) {
    const rule = new schedule.RecurrenceRule();
    rule.second = [0, 10, 20, 30, 40, 50];
    this.jobQueue.push([rule, this.translateQuestionScheduler.bind(this)]);
  }

  init() {
    LogUtils.log("ScheduleService init");
    this.jobQueue.forEach((job) => {
      schedule.scheduleJob(job[0], job[1]);
    });
  }

  async translateQuestionScheduler() {
    if (this.translating) {
      return;
    }
    this.translating = true;
    LogUtils.log(`Translate question task start.`);
    const questions = await this.leetCodeService.listEnglishLeetCodeQuestions();
    await FeiShuUtils.sendNotification(
      "翻译定时任务开始",
      "本次翻译任务开始，共有" + questions.length + "个问题需要翻译",
    );
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.title_slug) {
        continue;
      }
      const newTitle =
        await this.leetCodeService.translateQuestionByAutoIdAndSlug(
          question.id_auto,
          question.title_slug,
        );
      LogUtils.log(
        `Translate question ${question.title_slug} success, ${question.title} ==> ${newTitle}.`,
      );
    }
    await FeiShuUtils.sendNotification(
      "翻译定时任务结束",
      "本次翻译任务结束，共翻译" + questions.length + "个问题",
    );
    this.translating = false;
  }
}
