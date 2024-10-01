/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IError {
  message: string | any;
}

interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

export type IErrorResponse = IResponse<IError>;

export function isIErrorResponse(error: any): error is IErrorResponse {
  return error && typeof error === 'object' && 'data' in error;
}
