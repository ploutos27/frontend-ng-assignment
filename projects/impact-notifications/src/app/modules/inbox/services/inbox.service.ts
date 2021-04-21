import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInbox } from '../interfaces/inbox.interface';

@Injectable()
export class InboxService {
  constructor(private readonly http: HttpClient) {}

  inbox(email: string) {
    return this.http.get<IInbox[]>('/notifications', {
      params: {
        email
      },
    });
  }

  create(message: IInbox) {
    return this.http.post('/sendNotification', message);
  }

  delete(message: IInbox, email: string) {
    return this.http.post('/deleteNotification', {message, email});
  }
}
