import { Container } from "inversify";
import { ControllerNames, ServiceNames } from "@/constant/ServiceNames";
import { App } from "@/services/app";
import { HelloWorldController } from "@/controller/HelloWorldController";
import { BorisRouter } from "@/router";
import { DB } from "@/db";
import { UserService } from "@/services/userService";
import { AuthController } from "@/controller/AuthController";
import { AuthService } from "@/services/authService";
import { LeetCodeController } from "@/controller/LeetCodeController";
import { LeetCodeService } from "@/services/leetCodeService";
import { ScheduleService } from "@/services/scheduleService";
import { ThingsService } from "@/services/thingsService";

export class IOC {
  private static instance: IOC;

  private container: Container;

  private constructor() {
    this.container = new Container();
    this.bindServices();
  }

  static get<T>(serviceName: ServiceNames | ControllerNames): T {
    if (!IOC.instance) {
      IOC.instance = new IOC();
    }
    return IOC.instance.container.get(serviceName) as T;
  }

  private bindServices() {
    this.bindApplication();
    this.bindRouter();
    this.bindScheduler();
  }

  private bindRouter() {
    this.container
      .bind<HelloWorldController>(ControllerNames.HelloWorldController)
      .to(HelloWorldController)
      .inSingletonScope();
    this.container
      .bind<AuthController>(ControllerNames.AuthController)
      .to(AuthController)
      .inSingletonScope();
    this.container
      .bind<LeetCodeController>(ControllerNames.LeetCodeController)
      .to(LeetCodeController)
      .inSingletonScope();
    this.container.bind(ServiceNames.Router).to(BorisRouter);
  }

  private bindApplication() {
    this.container.bind<App>(ServiceNames.App).to(App).inSingletonScope();
    this.container.bind<DB>(ServiceNames.Database).to(DB).inSingletonScope();
    this.container.bind<UserService>(ServiceNames.UserService).to(UserService);
    this.container.bind<AuthService>(ServiceNames.AuthService).to(AuthService);
    this.container
      .bind<LeetCodeService>(ServiceNames.LeetCodeService)
      .to(LeetCodeService);
    this.container
      .bind<ThingsService>(ServiceNames.ThingsService)
      .to(ThingsService)
      .inSingletonScope();
  }

  private bindScheduler() {
    this.container
      .bind<ScheduleService>(ServiceNames.ScheduleService)
      .to(ScheduleService)
      .inSingletonScope();
  }
}
