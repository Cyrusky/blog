/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import { IconFont } from "@/component/Iconfont.tsx";

export type RouterItem = RouteObject & {
  icon?: ReactNode;
  darkIcon?: ReactNode;
  display: boolean;
  name: string;
};

const WelcomePage = React.lazy(() => import("@/pages/WelcomePage.tsx"));
const LeetCodePage = React.lazy(() => import("@/pages/LeetCodePage"));

export const routers: RouterItem[] = [
  {
    name: "首页",
    path: "/",
    display: true,
    icon: <IconFont type={"icon-home"} />,
    element: (
      <React.Suspense>
        <WelcomePage />
      </React.Suspense>
    ),
  },
  {
    name: "力扣题目管理",
    path: "/leetcode",
    display: true,
    icon: <IconFont type={"icon-leetcode"} />,
    element: (
      <React.Suspense>
        <LeetCodePage />
      </React.Suspense>
    ),
  },
];
