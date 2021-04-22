import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInbox } from '../interfaces/inbox.interface';
import { Methods } from '../../shared/services/methods';

@Injectable()
export class InboxService extends Methods {
  constructor(http: HttpClient) {
    super(http);
  }

  inbox(email: string) {
    return this.get<IInbox[]>({ params: { email }, url: '/notifications' });
  }

  create(message: IInbox) {
    return this.post({ body: { message }, url: '/sendNotification' });
  }

  delete(message: IInbox, email: string) {
    return this.post({ body: { message, email }, url: '/deleteNotification' });
  }
}
