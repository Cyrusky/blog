import "reflect-metadata";
import { LogUtils } from "@/utils/logUtils";
import { injectable } from "inversify";
import Router from "@koa/router";
import { Configs } from "@/config";
import { ControllerNames } from "@/constant/ServiceNames";
import { IOC } from "@/container";

export interface RouterRecords {
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "ALL";
  path: string;
  target: object;
  propertyKey: string;
  descriptor: PropertyDescriptor;
}

@injectable()
export class BorisRouter {
  private static registerRoutes: RouterRecords[] = [];

  static Get(routerPath: string) {
    return BorisRouter.method("GET", routerPath);
  }

  static Post(routerPath: string) {
    return BorisRouter.method("POST", routerPath);
  }

  static Put(routerPath: string) {
    return BorisRouter.method("PUT", routerPath);
  }

  static Delete(routerPath: string) {
    return BorisRouter.method("DELETE", routerPath);
  }

  static Patch(routerPath: string) {
    return BorisRouter.method("PATCH", routerPath);
  }

  static Options(routerPath: string) {
    return BorisRouter.method("OPTIONS", routerPath);
  }

  static Head(routerPath: string) {
    return BorisRouter.method("HEAD", routerPath);
  }

  static All(routerPath: string) {
    return BorisRouter.method("ALL", routerPath);
  }

  static Controller(prefix: string, controllerName: ControllerNames) {
    return function (target: object) {
      Reflect.defineMetadata("prefix", prefix, target);
      Reflect.defineMetadata("controllerName", controllerName, target);
    };
  }

  private static method(method: string, routerPath: string) {
    return function (
      target: object,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      BorisRouter.addRouter({
        method: method as RouterRecords["method"],
        path: routerPath,
        target,
        propertyKey,
        descriptor,
      });
    };
  }

  private static hasRouterPath(records: RouterRecords) {
    return BorisRouter.registerRoutes.some((route) => {
      return route.method === records.method && route.path === records.path;
    });
  }

  private static addRouter(routerRecord: RouterRecords) {
    if (BorisRouter.hasRouterPath(routerRecord)) {
      LogUtils.warn(`Router path ${routerRecord.path} already exists!`);
    } else {
      BorisRouter.registerRoutes.push(routerRecord);
    }
  }

  getRoutes() {
    const router = new Router({
      prefix: Configs.api.prefix,
    });
    BorisRouter.registerRoutes.forEach((route) => {
      const routePath =
        (Reflect.getMetadata("prefix", route.target.constructor) || "") +
        route.path;
      const controllerName: ControllerNames = Reflect.getMetadata(
        "controllerName",
        route.target.constructor,
      );

      let functionBind: CallableFunction | undefined;

      if (controllerName) {
        const instance = IOC.get(controllerName);
        functionBind = route.descriptor.value.bind(instance || route.target);
      } else {
        functionBind = route.descriptor.value.bind(route.target);
      }

      LogUtils.trace(
        `Registering route ${route.method} ${Configs.api.prefix}${routePath}`,
      );

      switch (route.method) {
        case "GET":
          router.get(route.propertyKey, routePath, functionBind);
          break;
        case "POST":
          router.post(route.propertyKey, routePath, functionBind);
          break;
        case "PUT":
          router.put(route.propertyKey, routePath, functionBind);
          break;
        case "DELETE":
          router.delete(route.propertyKey, routePath, functionBind);
          break;
        case "PATCH":
          router.patch(route.propertyKey, routePath, functionBind);
          break;
        case "OPTIONS":
          router.options(route.propertyKey, routePath, functionBind);
          break;
        case "HEAD":
          router.head(route.propertyKey, routePath, functionBind);
          break;
        case "ALL":
          router.all(route.propertyKey, routePath, functionBind);
          break;
        default:
          router.get(route.propertyKey, routePath, functionBind);
          break;
      }
    });
    return {
      routes: router.routes(),
      allowMethod: router.allowedMethods(),
    };
  }
}
