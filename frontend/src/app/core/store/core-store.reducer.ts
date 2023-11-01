import { createReducer, on } from '@ngrx/store';
import { coreActions } from './core-store.actions';
import { Localization } from '@app/shared/models/localization';
import { MappedApiResponse } from '@app/shared/components/map/map';
import * as moment from 'moment';

export interface ICoreState {
  name?: string;
  id?: string;
  selectedLocalization?: MappedApiResponse;
  currentDate: Date;
  localizations: Localization[];
}

export const initialCoreState: ICoreState = {
  localizations: [],
  currentDate: moment().subtract(1, 'day').toDate(),
};

export const coreStoreReducer = createReducer(
  initialCoreState,
  on(coreActions.setUserName, (_state, { name }) => ({
    ..._state,
    name,
  })),
  on(coreActions.setUserId, (_state, { id }) => ({ ..._state, id })),
  on(coreActions.setNewDate, (_state, { date }) => ({
    ..._state,
    currentDate: date,
  })),
  on(coreActions.setSelectedLocalizationPin, (_state, { localization }) => ({
    ..._state,
    selectedLocalization: localization,
  }))
);
