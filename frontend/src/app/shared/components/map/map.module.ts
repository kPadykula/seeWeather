import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { CardComponent } from '../card/card.component';
import { MapStore } from './map-store.service';
import { MapService } from './map.service';
import { WeatherPinComponent } from './weather-pin/weather-pin.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MapComponent, WeatherPinComponent],
  imports: [CardComponent, CommonModule],
  exports: [MapComponent],
  providers: [MapStore, MapService],
})
export class MapModule {}
