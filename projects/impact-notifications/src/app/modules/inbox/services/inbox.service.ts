import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInbox } from '../interfaces/inbox.interface';
import { Methods } from '../../shared/services/methods';

@Injectable()
export class InboxService extends Methods {
  constructor(http: HttpClient) {
    super(http);
  }

  create(message: IInbox) {
    return this.post({ body: { message }, url: '/send' });
  }

  read(email: string, type: string) {
    return this.get<IInbox[]>({
      params: { email, type },
      url: '/' + type,
    });
  }

  delete(message: IInbox, email: string, type: string) {
    return this.post({
      body: { message, email, type },
      url: '/' + type,
    });
  }
}
