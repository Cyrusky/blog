import axios, {AxiosInstance} from "axios";
import {Configs} from "../config";

export class ApiRequest {

  private static instance: ApiRequest;

  private axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: Configs.baseURL,
    });
    this.axios.interceptors.request.use((config) => {
      return config
    })

    this.axios.interceptors.response.use((response) => {
      return response.data;
    })
  }

  public static getInstance(): ApiRequest {
    if (!ApiRequest.instance) {
      ApiRequest.instance = new ApiRequest();
    }
    return ApiRequest.instance;
  }

  public static get<T>(url: string, params?: object) {
    return ApiRequest.getInstance().axios.get<T>(url, {params});
  }

  public static post<T>(url: string, data?: object) {
    return ApiRequest.getInstance().axios.post<T>(url, data);
  }

  public static put<T>(url: string, data?: object) {
    return ApiRequest.getInstance().axios.put<T>(url, data);
  }

  public static delete<T>(url: string) {
    return ApiRequest.getInstance().axios.delete<T>(url);
  }
}
