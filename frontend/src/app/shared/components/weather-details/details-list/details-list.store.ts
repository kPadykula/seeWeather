import { Injectable } from '@angular/core';
import { ListInformation, ListItem } from './details-list';
import { ComponentStore } from '@ngrx/component-store';
import { merge } from 'lodash';

interface DetailsListState {
  data?: ListInformation;
}

@Injectable()
export class DetailsListStore extends ComponentStore<DetailsListState> {
  constructor() {
    super({});
  }

  readonly setData = this.updater((_state, data: ListInformation) => ({
    ..._state,
    data: data,
  }));

  readonly data$ = this.select((_state) => {
    const arrLength = _state.data?.dayPrediction.length;
    if (!arrLength) return [];
    return (
      merge(
        merge(_state.data?.dayPrediction, _state.data?.dayTemperature),
        _state.data?.dayWindSpeed
      ) as ListItem[]
    ).filter((info) => [5, 10, 15, 20].includes(info.hour));
  });
}
