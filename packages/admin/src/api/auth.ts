import {ApiRequest} from "@/util/apiRequest.ts";

const AuthAPIUrls = {
  login: "/api/v1/user/auth",
  register: "/api/v1/user/register",
}

export class AuthAPI {
  static async login(data: LoginRequest) {
    return ApiRequest.post<LoginRequest>(AuthAPIUrls.login, data);
  }
}
