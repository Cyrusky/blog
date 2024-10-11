import "reflect-metadata";
import { IOC } from "@/container";
import type { ScheduleService } from "@/services/scheduleService";
import { ServiceNames } from "@/constant/ServiceNames";
import type { App } from "@/services/app";

IOC.get<App>(ServiceNames.App).start();
IOC.get<ScheduleService>(ServiceNames.ScheduleService).init();
