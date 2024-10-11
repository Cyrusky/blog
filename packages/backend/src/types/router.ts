import type Router from "@koa/router";

export interface TokenUserInfo {
  username: string;
  expireAt?: number;
}

export interface BorisRouter {
  getRouters: () => Router;
  bindRouter: () => void;

  get prefix(): string;
}

// eslint-disable-next-line
export type AnyType = any;

export enum LeetCodeQuestionDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export enum LeetCodeQuestionStatus {
  NotStarted,
  InProgress,
  resolved,
}
export interface LeetCodeQuestionTag {
  id: string;
  name: string;
  slug: string;
}
export interface LeetCodeQuestion {
  frontendQuestionId: string;
  acRate: number;
  difficulty: LeetCodeQuestionDifficulty;
  isFavor: boolean;
  paidOnly: boolean;
  status: LeetCodeQuestionStatus;
  title: string;
  titleSlug: string;
  topicTags: LeetCodeQuestionTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
}
