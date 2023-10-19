import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { LoginCloudComponent } from './login-cloud/login-cloud.componen';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MapComponent } from './map/map.component';
import { MapModule } from './map/map.module';

@NgModule({
  imports: [RouterModule, MapModule, CardComponent],
  declarations: [LoginCloudComponent, WelcomeComponent],
  exports: [CardComponent, LoginCloudComponent, WelcomeComponent, MapComponent],
})
export class ComponentsModule {}
