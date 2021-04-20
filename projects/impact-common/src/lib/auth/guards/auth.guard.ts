import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RemoveUserAuth } from '../store/auth.actions';
import { AuthState } from '../store/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private readonly store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(AuthState).pipe(
      map((x) => {
        if (!x.authenticated) {
          this.store.dispatch(new RemoveUserAuth()).subscribe(() => {
            this.router.navigate(['/auth/login'], {
              queryParams: {
                url: this.getBacklink(state),
              },
            });
          });
          return false;
        } else {
          return true;
        }
      })
    );
  }

  getBacklink(state: RouterStateSnapshot) {
    switch (state.url.toLocaleLowerCase()) {
      case '/auth/logout':
      case '/auth/login':
        return '/';
        break;

      default:
        return state.url;
        break;
    }
  }
}
