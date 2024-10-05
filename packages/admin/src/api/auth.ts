import { ApiRequest } from "@/util/apiRequest.ts";

const AuthAPIUrls = {
  login: "/v1/auth/auth",
  isLogin: "/v1/auth/isLogin",
  register: "/v1/auth/register",
};

export class AuthAPI {
  static async login(data: LoginRequest) {
    return ApiRequest.post<LoginRequest>(AuthAPIUrls.login, data);
  }

  static async isLogin(): Promise<ApiResult<boolean>> {
    return ApiRequest.get(AuthAPIUrls.isLogin);
  }
}
