import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth-store.actions';
import {
  catchError,
  combineLatest,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { coreActions } from '@app/core/store/core-store.actions';
import { Router } from '@angular/router';
import { IUser } from '@app/shared/models/user';
import { Localization } from '@app/shared/models/localization';

@Injectable()
export class AuthApiEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((action) =>
        this.service.login(action.credentials).pipe(
          switchMap((user) => {
            this.store.dispatch(coreActions.setUserName({ name: user.name }));
            this.store.dispatch(coreActions.setUserId({ id: user._id }));
            return combineLatest<[Required<IUser>, Localization[]]>([
              of(user),
              this.service.getLocalizations(user._id),
            ]).pipe(
              map(([user, localizations]) => {
                this.store.dispatch(
                  coreActions.setUserLocalizations({ localizations })
                );
                return authActions.loginSuccessfully({ user });
              })
            );
          }),
          tap(() => {
            this.router.navigate(['']);
          }),
          catchError((err) => of(authActions.loginFail()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: LoginService,
    private store: Store,
    private router: Router
  ) {}
}
