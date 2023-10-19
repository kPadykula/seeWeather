import { createReducer, on } from '@ngrx/store';
import { coreActions } from './core-store.actions';
import { Localization } from '@app/shared/models/localization';

export interface ICoreState {
  name?: string;
  id?: string;
  localizations: Localization[];
}

export const initialCoreState: ICoreState = { localizations: [] };

export const coreStoreReducer = createReducer(
  initialCoreState,
  on(coreActions.setUserName, (_state, { name }) => ({
    ..._state,
    name,
  })),
  on(coreActions.setUserId, (_state, { id }) => ({ ..._state, id }))
);
