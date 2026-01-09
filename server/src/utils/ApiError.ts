export default class ApiError {
  public message: string;
  public error: number;

  constructor(message: string, error = 422) {
    this.message = message;
    this.error = error;
  }
}
