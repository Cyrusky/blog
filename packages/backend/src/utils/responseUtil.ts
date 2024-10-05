export class ResponseUtil {
  static success<T = object>(data: T, message: string = "success") {
    return {
      code: 200,
      message,
      data,
    };
  }

  static fail(code: number, message: string = "fail") {
    return {
      code,
      message,
    };
  }

  static unAuthorized() {
    return {
      code: 401,
      message: "unauthorized",
    };
  }

  static notFound() {
    return {
      code: 404,
      message: "Not found",
    };
  }

  static serverError(errMsg: string) {
    return {
      code: 500,
      message: `Server error : ${errMsg}`,
    };
  }
}
