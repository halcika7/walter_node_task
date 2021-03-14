export class HttpException {
  private message = '';

  /**
   * Instantiate a plain HTTP Exception.
   *
   * @example
   * `throw new HttpException()`
   *
   * @param response string or object describing the error condition.
   * @param status HTTP response status code.
   */
  constructor(
    private readonly response: Record<string, string | number>,
    private readonly status: number,
    readonly name: string = 'Error'
  ) {
    this.initMessage();
  }

  private initMessage = () => {
    this.message = this.response.message as string;
  };

  public getResponse(): string | Record<string, unknown> {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }

  public getMessage() {
    return this.message;
  }

  public static createBody(message: string, statusCode: number) {
    return { statusCode, message };
  }
}
