import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiTokenService } from '../services/api-token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authApiTokenService: ApiTokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiToken = this.authApiTokenService.currentTokenUser(); // get the token from local storage
    if (apiToken) {
      const req = request.clone({
        setHeaders: {
          'auth': 'testTokenBlah', // in our case we cannot sent boolean
        },
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
