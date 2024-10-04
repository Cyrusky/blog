import {ApiRequest} from "../util/apiRequest.ts";

export const UserApiURLs = {
  login: "/api/v1/user/login",
}

export class UserAPI {

  static loginAPIURL = "/api/v1/user/login";

  static async login(data: LoginRequest) {
    return ApiRequest.post<LoginRequest>(UserApiURLs.login, data);
  }
}
