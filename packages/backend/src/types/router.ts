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
