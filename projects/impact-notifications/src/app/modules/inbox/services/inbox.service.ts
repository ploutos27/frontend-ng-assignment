import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInbox } from '../interfaces/inbox.interface';

@Injectable()
export class InboxService {
  constructor(private readonly http: HttpClient) {}

  inbox() {
    return this.http.get<IInbox>('/api/v1/inbox/incoming');
  }

  sent() {
    return this.http.get<IInbox>('/api/v1/inbox/sent');
  }

  create(message: IInbox) {
    return this.http.post<IInbox>('/api/v1/inbox/create', message);
  }
  
  delete(id: string) {
    return this.http.delete<string>('/api/v1/inbox/delete/' + id);
  }
}
