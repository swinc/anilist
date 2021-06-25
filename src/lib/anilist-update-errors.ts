type CustomErrorObject = {
  message: string,
  data: any
}

export class CustomError extends Error {
  constructor(_customErrorObject: CustomErrorObject, ...params: any[]) {
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.name = 'CustomError'
  }
}