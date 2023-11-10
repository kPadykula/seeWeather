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
import { DetailsItemComponent } from './weather-details/details-list/details-item/details-item.component';
import { DetailsListComponent } from './weather-details/details-list/details-list.component';
import { LocalizationListComponent } from './localization-list/localization-list.component';
import { PrimeNgModule } from '../prime.module';
import { LocalizationItemListComponent } from './localization-list/localization-item/localization-item.component';
import { LocalizationAddComponent } from './localization-list/localization-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    MapModule,
    CardComponent,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    LoginCloudComponent,
    WelcomeComponent,
    WeatherDetailsComponent,
    DaySwitchComponent,
    DetailsListComponent,
    DetailsItemComponent,
    LocalizationListComponent,
    LocalizationAddComponent,
    LocalizationItemListComponent,
  ],
  exports: [
    CardComponent,
    LoginCloudComponent,
    WelcomeComponent,
    MapComponent,
    WeatherDetailsComponent,
    DaySwitchComponent,
    LocalizationListComponent,
  ],
})
export class ComponentsModule {}
