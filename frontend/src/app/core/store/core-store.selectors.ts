import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoreState } from './core-store.reducer';

export const coreStoreSelectors = createFeatureSelector<ICoreState>('core');

export const getUserName = createSelector(
  coreStoreSelectors,
  (_state) => _state.name
);

export const getCurrentDate = createSelector(
  coreStoreSelectors,
  (_state) => _state.currentDate
);

export const getSelectedLocalization = createSelector(
  coreStoreSelectors,
  (_state) => _state.selectedLocalization
);

export const getUserLocalizations = createSelector(
  coreStoreSelectors,
  (_state) => _state.localizations
);

export const getUserId = createSelector(
  coreStoreSelectors,
  (_state) => _state.id
);
