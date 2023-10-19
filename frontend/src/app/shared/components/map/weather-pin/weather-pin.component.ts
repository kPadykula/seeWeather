import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Localization } from '@app/shared/models/localization';
import { MapCoordination, PinPosition, PinRotate } from '../map-localizations';
import { MapService, Temperature } from '../map.service';

@Component({
  selector: '[appWeatherPin]',
  templateUrl: './weather-pin.component.html',
  styleUrls: ['./weather-pin.component.scss'],
})
export class WeatherPinComponent implements OnInit {
  @ViewChild('pin', { read: ElementRef, static: true }) pin:
    | ElementRef<HTMLDivElement>
    | undefined;

  @Input() localization: (Localization & MapCoordination) | undefined;

  @HostBinding('style.top.px') top: number = 0;
  @HostBinding('style.left.px') left: number = 0;

  weatherPinInfo: (Localization & MapCoordination & Temperature) | undefined;

  constructor(private service: MapService) {}

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
      this.service
        .getMeteoData(this.localization)
        .subscribe((res) => (this.weatherPinInfo = res));
    }
  }
}
