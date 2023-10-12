import { createReducer, on } from '@ngrx/store';
import { coreActions } from './core-store.actions';

export interface ICoreState {
  name?: string;
}

export const initialCoreState: ICoreState = {};

export const coreStoreReducer = createReducer(
  initialCoreState,
  on(coreActions.setUserName, (_state, { name }) => ({
    ..._state,
    name,
  }))
);
