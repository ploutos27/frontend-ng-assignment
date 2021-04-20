import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService implements Resolve<Observable<any>> {
  constructor(private readonly service: ProfileService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    return this.service.load();
  }
}
