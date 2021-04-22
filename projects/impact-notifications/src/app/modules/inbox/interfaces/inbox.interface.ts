export interface IInbox {
  from: string;
  to: string;
  date?: Date;
  subject: string;
  message: string;
}
