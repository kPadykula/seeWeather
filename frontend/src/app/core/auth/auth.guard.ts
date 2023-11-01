import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AuthSelectors } from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private store: Store) {}

  isNotAuth(): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuth).pipe(
      tap((isAuth) => isAuth && this.router.navigate(['home'])),
      map((isAuth) => !isAuth)
    );
  }

  isAuth(): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuth);
  }
}

export const isAuthGuard: CanActivateFn = () => inject(AuthGuard).isAuth();
export const isNotAuth: CanActivateFn = () => inject(AuthGuard).isNotAuth();
