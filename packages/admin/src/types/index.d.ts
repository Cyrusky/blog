declare interface ApiResult<T> {
  code: number;
  errorCode: string;
  data: T;
}

declare interface LoginRequest {
  username: string;
  password: string;
}
