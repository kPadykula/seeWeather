import { Injectable } from '@angular/core';
import { Localization } from '@app/shared/models/localization';
import { ComponentStore } from '@ngrx/component-store';
import { MapCoordination } from './map-localizations';

export interface MapStoreState {
  localizations: (Localization & MapCoordination)[];
}

@Injectable()
export class MapStore extends ComponentStore<MapStoreState> {
  constructor() {
    super({
      localizations: [],
    });
  }

  readonly setLocalizations = this.updater(
    (_state, localizations: (Localization & MapCoordination)[]) => ({
      ..._state,
      localizations,
    })
  );

  readonly localizations$ = this.select((_state) => _state.localizations);
}
