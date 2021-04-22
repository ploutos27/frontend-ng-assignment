import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Methods } from '../../shared/services/methods';

@Injectable()
export class DashboardService extends Methods {
  constructor(http: HttpClient) {
    super(http);
  }

  latestMessages(email: string, take: string) {
    return this.get({
      params: { email, take },
      url: '/latestMessages',
    });
  }

  receivedSendMessages(email: string) {
    return this.get({
      params: { email },
      url: '/receivedSendMessages',
    });
  }

  mostFrequestUsers(email: string) {
    return this.get({
      params: { email },
      url: '/mostFrequestUsers',
    });
  }
}
