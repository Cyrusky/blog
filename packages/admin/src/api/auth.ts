import { ApiRequest } from "@/util/apiRequest.ts";
import type { IsLoginResponse, LoginResponse } from "@boris/common";

const AuthAPIUrls = {
  login: "/auth/login",
  isLogin: "/auth/isLogin",
  register: "/v1/auth/register",
};

export class AuthAPI {
  static async login(data: LoginRequest): Promise<LoginResponse> {
    return ApiRequest.post(AuthAPIUrls.login, data);
  }

  static async isLogin(): Promise<IsLoginResponse> {
    return ApiRequest.get(AuthAPIUrls.isLogin);
  }
}
