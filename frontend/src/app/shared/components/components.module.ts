import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { LoginCloudComponent } from './login-cloud/login-cloud.componen';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MapComponent } from './map/map.component';
import { MapModule } from './map/map.module';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { DaySwitchComponent } from './day-switch/day-switch.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [RouterModule, MapModule, CardComponent, CommonModule],
  declarations: [
    LoginCloudComponent,
    WelcomeComponent,
    WeatherDetailsComponent,
    DaySwitchComponent,
  ],
  exports: [
    CardComponent,
    LoginCloudComponent,
    WelcomeComponent,
    MapComponent,
    WeatherDetailsComponent,
    DaySwitchComponent,
  ],
})
export class ComponentsModule {}
