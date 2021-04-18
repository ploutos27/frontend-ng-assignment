import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslationService } from '../services/translation.service';

@Injectable()
export class TranslationInterceptor implements HttpInterceptor {
  constructor(private readonly service: TranslationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        'x-data-locale': this.service.getCurrentLanguage(),
      },
    });
    return next.handle(req);
  }
}
