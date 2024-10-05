import { Context } from "koa";
import { injectable } from "inversify";
import { BorisRouter } from "@/router";
import { ControllerNames } from "@/constant/ServiceNames";

@injectable()
@BorisRouter.Controller("/hello", ControllerNames.HelloWorldController)
export class HelloWorldController {
  @BorisRouter.Get("/")
  async getHelloWorld(ctx: Context) {
    ctx.body = "Hello World!";
  }
}
