import { Configs } from "@/config";
import axios from "axios";

export class FeiShuUtils {
  static async sendNotification(title: string, content: string) {
    const messageBody = {
      msg_type: "interactive",
      card: {
        elements: [
          {
            tag: "div",
            text: {
              content: content,
              tag: "lark_md",
            },
          },
        ],
        header: {
          title: {
            content: `${title}【Boris通知】`,
            tag: "plain_text",
          },
        },
      },
    };
    await axios.post(
      `https://open.feishu.cn/open-apis/bot/v2/hook/${Configs.FeiShuToken}`,
      messageBody,
    );
  }
}
