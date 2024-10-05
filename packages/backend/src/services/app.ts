import { inject, injectable } from "inversify";
import { ServiceNames } from "@/constant/ServiceNames";
import { Configs } from "@/config";
import Koa from "koa";
import { LogUtils } from "@/utils/logUtils";
import { BorisRouter } from "@/router";
import { logMiddleware } from "@/middleware/logMiddleware";
import { authMiddleware } from "@/middleware/authMiddleware";
import bodyParser from "koa-bodyparser";
import { exceptionMiddleware } from "@/middleware/exceptionMiddleware";

@injectable()
export class App {
  private app = new Koa();
  constructor(
    @inject<BorisRouter>(ServiceNames.Router) private router: BorisRouter,
  ) {
    this.app.use(exceptionMiddleware);
    this.app.use(bodyParser());
    this.app.use(logMiddleware);
    this.app.use(authMiddleware);

    const { routes, allowMethod } = this.router.getRoutes();
    this.app.use(routes).use(allowMethod);
  }

  start() {
    this.app.listen(Configs.port, () => {
      LogUtils.log(`Server is running on http://localhost:${Configs.port}`);
    });
  }
}
