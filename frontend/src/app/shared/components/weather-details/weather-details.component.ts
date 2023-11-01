import { Component, OnDestroy, OnInit } from '@angular/core';
import { getSelectedLocalization } from '@app/core/store/core-store.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subject, tap } from 'rxjs';
import { MappedApiResponse } from '../map/map';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;

  selectedLocalization: Observable<MappedApiResponse | undefined> = this.store
    .select(getSelectedLocalization)
    .pipe(tap((localization) => (this.isVisible = !!localization)));

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
