import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from './auth-store.reducer';

export const authStoreSelectors = createFeatureSelector<IAuthState>('auth');

export const isAuth = createSelector(
  authStoreSelectors,
  (_state) => _state.isAuth
);
