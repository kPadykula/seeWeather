import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './auth-store';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthApiEffects } from './auth-store/auth-store.api-effects';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    StoreModule.forFeature('auth', AuthReducer.authStoreReducer),
    EffectsModule.forFeature(AuthApiEffects),
    SharedModule,
  ],
  providers: [LoginService],
  exports: [LoginComponent],
})
export class AuthModule {}
