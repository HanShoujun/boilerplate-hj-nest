/**
* @description:
* @author:Hsj
* @Date:2020-09-06 10:35:45
*/

// 响应状态
export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

export type TMessage = string;
export type TExceptionOption = TMessage | {
  message: TMessage;
  error?: any
};

// HTTP 状态返回
export interface IHttpResponseBase {
  status: EHttpStatus;
  message: TMessage;
}

// HTTP error
export type THttpErrorResponse = IHttpResponseBase & {
  error: any;
  debug?: string
};