import { Injectable } from '@angular/core';
import { Localization } from '@app/shared/models/localization';
import { ComponentStore } from '@ngrx/component-store';
import { MapCoordination } from './map-localizations';

export interface MapStoreState {
  localizations: (Localization & MapCoordination)[];
  selected: string;
}

@Injectable()
export class MapStore extends ComponentStore<MapStoreState> {
  constructor() {
    super({
      localizations: [],
      selected: '',
    });
  }

  readonly setLocalizations = this.updater(
    (_state, localizations: (Localization & MapCoordination)[]) => ({
      ..._state,
      localizations,
    })
  );

  readonly setSelectedPin = this.updater((_state, pin: string) => ({
    ..._state,
    selected: pin,
  }));

  readonly removeSelected = this.updater((_state) => ({
    ..._state,
    selected: '',
  }));

  readonly localizations$ = this.select((_state) => _state.localizations);
  readonly selectedPin = this.select((_state) => _state.selected);
}
