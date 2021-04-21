import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  latestMessages(email: string, take: string) {
    return this.http.get('/latestMessages', {
      params: {
        email,
        take,
      },
    });
  }

  receivedSendMessages(email: string) {
     return this.http.get('/receivedSendMessages', {
       params: {
         email
       },
     });
  }
}
