import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})

export class SharedResolverService implements Resolve<Observable<any>> {
  constructor(private readonly service: SharedService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    return this.service.me();
  }
}
