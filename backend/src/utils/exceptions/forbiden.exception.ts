import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  /**
   * Instantiate a `ForbiddenException` Exception.
   *
   * @example
   * `throw new ForbiddenException()`
   *
   * The HTTP response status code will be 403.
   *
   * @param description a short description of the HTTP error.
   */
  constructor() {
    super(
      HttpException.createBody(
        HTTPDescription.FORBIDDEN,
        HTTPCodes.FORBIDDEN
      ),
      HTTPCodes.FORBIDDEN,
      HTTPDescription.FORBIDDEN
    );
  }
}
