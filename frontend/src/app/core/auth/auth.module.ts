import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './auth-store';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    StoreModule.forFeature('auth', AuthReducer.authStoreReducer),
    SharedModule,
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
