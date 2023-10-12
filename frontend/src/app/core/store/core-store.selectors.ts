import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoreState } from './core-store.reducer';

export const coreStoreSelectors = createFeatureSelector<ICoreState>('core');

export const getUserName = createSelector(
  coreStoreSelectors,
  (_state) => _state.name
);
