import { Errors } from "../../../constants/errors";

export class UserNotFoundException extends Error {
  statusCode: number = 404;
  message: string = Errors.INVALID_USER;

  constructor() {
    super(Errors.INVALID_USER);
  }
}