class SuccessResponse {
  constructor (data, statusCode=200) {
    this.data = {"status_code": statusCode, "data": data};
  }
}


class ErrorResponse {
  constructor (errMsg, errName, statusCode=400) {
    this.data = {
        "err_msg": errMsg, "err_name": errName, "status_code": statusCode};
  }
}

module.exports = {
  SuccessResponse: SuccessResponse,
  ErrorResponse: ErrorResponse
}
