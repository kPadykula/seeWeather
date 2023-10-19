import { Component, OnInit } from '@angular/core';
import { Localization } from '@app/shared/models/localization';
import { DefaultLocalizations, MapCoordination } from './map-localizations';
import { MapStore } from './map-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  get localizations(): Observable<(Localization & MapCoordination)[]> {
    return this.mapStore.localizations$;
  }

  constructor(private mapStore: MapStore) {}

  ngOnInit(): void {
    this.mapStore.setLocalizations(DefaultLocalizations);
  }
}
