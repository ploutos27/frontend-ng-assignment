import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiTokenService } from '../services/api-token.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(
    public readonly apiTokenService: ApiTokenService,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const valid = this.apiTokenService.valid();

    if (valid) {
      return this.router.navigate(['/']);
    }

    return true;
  }
}
