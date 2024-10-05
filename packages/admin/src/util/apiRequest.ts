import type { AxiosInstance } from "axios";
import axios from "axios";
import { Configs } from "@/config";
import { message } from "antd";
import {
  AUTH_TOKEN_HEADER_KEY,
  AUTH_TOKEN_STORAGE_KEY,
} from "@boris/common/src/constant";

export class ApiRequest {
  private static instance: ApiRequest;

  private axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: Configs.baseURL,
    });
    this.axios.interceptors.request.use((config) => {
      const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
      if (token) {
        config.headers[AUTH_TOKEN_HEADER_KEY] = token;
      }
      return config;
    });

    this.axios.interceptors.response.use((response) => {
      switch (response.status) {
        case 401:
          message.error("Unauthorized");
          break;
        case 403:
          message.error("Forbidden");
          break;
        case 404:
          message.error("Not Found");
          break;
        case 500:
          message.error("Internal Server Error");
          break;
        default:
          break;
      }
      return response.data.data;
    });
  }

  public static getInstance(): ApiRequest {
    if (!ApiRequest.instance) {
      ApiRequest.instance = new ApiRequest();
    }
    return ApiRequest.instance;
  }

  public static get<T>(url: string, params?: object) {
    return ApiRequest.getInstance().axios.get<T, T>(url, { params });
  }

  public static post<T>(url: string, data?: object) {
    return ApiRequest.getInstance().axios.post<T, T>(url, data);
  }

  public static put<T>(url: string, data?: object) {
    return ApiRequest.getInstance().axios.put<T, T>(url, data);
  }

  public static delete<T>(url: string) {
    return ApiRequest.getInstance().axios.delete<T, T>(url);
  }
}
