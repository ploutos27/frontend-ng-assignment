import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { InboxService } from './inbox.service';


@Injectable({
  providedIn: 'root',
})
export class InboxResolverService implements Resolve<Observable<any>> {
  constructor(private readonly service: InboxService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    return this.service.inbox();
  }
}
