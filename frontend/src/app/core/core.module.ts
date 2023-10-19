import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CoreReducer } from './store';
import { AuthModule } from './auth/auth.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forRoot({ core: CoreReducer.coreStoreReducer }),
    EffectsModule.forRoot(),
  ],
  exports: [AuthModule, StoreModule],
})
export class CoreModule {}
