import { createReducer, on } from '@ngrx/store';
import { authActions } from './auth-store.actions';

export interface IAuthState {
  isAuth: boolean;
  authToken?: string;
}

export const initialAuthState: IAuthState = {
  isAuth: false,
};

export const authStoreReducer = createReducer(
  initialAuthState,
  on(authActions.loginSuccessfuly, (_state, { isAuth, authToken }) => ({
    ..._state,
    isAuth,
    authToken,
  })),
  on(authActions.loginFail, (_state) => initialAuthState),
  on(authActions.logout, (_state) => initialAuthState)
);
