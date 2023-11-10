import { Injectable } from '@angular/core';
import { ListInformation, ListItem } from './details-list';
import { ComponentStore } from '@ngrx/component-store';
import { merge } from 'lodash';

interface DetailsListState {
  data?: ListInformation;
  numberList: number[];
}

@Injectable()
export class DetailsListStore extends ComponentStore<DetailsListState> {
  constructor() {
    super({ numberList: [] });
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
    ).filter((info) =>
      _state.numberList.length === 0
        ? true
        : _state.numberList.includes(info.hour)
    );
  });

  readonly setNumberList = this.updater((_state, numberList: number[]) => ({
    ..._state,
    numberList,
  }));
}
