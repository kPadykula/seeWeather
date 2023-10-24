import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Localization } from '@app/shared/models/localization';
import { MapCoordination, PinPosition, PinRotate } from '../map-localizations';
import { MapService } from '../map.service';
import { MappedApiResponse } from '../map';
import { Store } from '@ngrx/store';
import { getCurrentDate } from '@app/core/store/core-store.selectors';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { uniqueId } from 'lodash';
import { MapStore } from '../map-store.service';
import { coreActions } from '@app/core/store/core-store.actions';

@Component({
  selector: '[appWeatherPin]',
  templateUrl: './weather-pin.component.html',
  styleUrls: ['./weather-pin.component.scss'],
})
export class WeatherPinComponent implements OnInit, OnDestroy {
  private UUID = uniqueId();

  @HostListener('mouseenter')
  onMouseOver() {
    this.mapStore.setSelectedPin(this.UUID);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mapStore.removeSelected();
  }

  @ViewChild('pin', { read: ElementRef, static: true }) pin:
    | ElementRef<HTMLDivElement>
    | undefined;

  @Input() localization: (Localization & MapCoordination) | undefined;

  @HostBinding('style.top.px') top: number = 0;
  @HostBinding('style.left.px') left: number = 0;

  weatherPinInfo: MappedApiResponse | undefined;

  isSelected: boolean | null = null;

  maxTemp: number = 0;
  minTemp: number = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private service: MapService,
    private store: Store,
    private mapStore: MapStore
  ) {}

  ngOnInit(): void {
    if (this.localization) {
      this.top = this.localization.top;
      this.left = this.localization.left;

      if (this.localization.position === PinPosition.BOTTOM && this.pin) {
        this.pin.nativeElement.classList.add('bottom');
      }

      if (this.localization.rotate === PinRotate.RIGHT && this.pin) {
        this.pin.nativeElement.classList.add('right');
      }

      this.initData();
      this.subscribeSelected();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectPin(): void {
    this.store.dispatch(
      coreActions.setSelectedLocalizationPin({
        localization: this.weatherPinInfo,
      })
    );
  }

  private initData(): void {
    if (this.localization)
      this.service.getMeteoData(this.localization).subscribe((res) => {
        this.weatherPinInfo = res;
        this.subscribeDateChange();
      });
  }

  private subscribeDateChange(): void {
    this.store
      .select(getCurrentDate)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((date) => {
        if (this.weatherPinInfo) {
          const { min, max } = this.service.getMaxMinTempByDate(
            date,
            this.weatherPinInfo
          );
          this.maxTemp = max;
          this.minTemp = min;
        }
      });
  }

  private subscribeSelected(): void {
    this.mapStore.selectedPin
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((id) => {
        if (id === '') {
          this.isSelected = null;
        } else {
          this.isSelected = this.UUID === id;
        }
      });
  }
}
