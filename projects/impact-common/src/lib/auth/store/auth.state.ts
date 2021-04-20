import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { SetUserAuth, RemoveUserAuth } from './auth.actions';
import { IUser } from '../interfaces/auth.interface';
import { ApiTokenService } from '../services/api-token.service';

@Injectable()
@State<IUser>({
  name: 'auth',
  defaults: {
    authenticated: false,
    userDetails: undefined,
  },
})
export class AuthState implements NgxsOnInit {
  private _getCurrentUser() {
    if (!this.apiTokenService.valid()) {
      return of({
        authenticated: false,
        userDetails: undefined,
      });
    }
    return this.apiTokenService.me().pipe(
      map((me: IUser) => {
        if (me.authenticated) {
          return {
            authenticated: me.authenticated,
            userDetails: me.userDetails,
          };
        } else {
          return {
            authenticated: false,
            userDetails: null,
          };
        }
      })
    );
  }

  constructor(private readonly apiTokenService: ApiTokenService) {}

  /**
   * Will be called once during module initialization
   * @param ctx
   */
  ngxsOnInit(ctx?: StateContext<IUser>): any {
    this._getCurrentUser().subscribe((res: IUser) => {
      ctx.patchState({
        authenticated: res.authenticated,
        userDetails: res.userDetails,
      });
    });
  }

  /**
   * Sets current User
   * @param ctx
   * @param action
   */
  @Action(SetUserAuth)
  setCurrentApiToken(ctx: StateContext<IUser>, action: SetUserAuth) {
    this.apiTokenService.assign(action.user);
    return this._getCurrentUser().pipe(
      tap((x: IUser) => {
        ctx.patchState({
          authenticated: x.authenticated,
          userDetails: x.userDetails,
        });
      })
    );
  }

  /**
   * Removes current User, use in case of logout
   * @param ctx
   * @param action
   */
  @Action(RemoveUserAuth)
  removeCurrentApiToken(ctx: StateContext<IUser>, action: RemoveUserAuth) {
    this.apiTokenService.clean();
    return this._getCurrentUser().pipe(
      tap((x: IUser) => {
        ctx.patchState({
          authenticated: x.authenticated,
          userDetails: x.userDetails,
        });
      })
    );
  }
}
