
export enum Status {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
export interface IResponse {
  status: Status;
  message: string;
}