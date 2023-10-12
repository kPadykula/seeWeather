import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CoreReducer } from './store';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [AuthModule, StoreModule.forRoot(CoreReducer.coreStoreReducer)],
  exports: [AuthModule, StoreModule],
})
export class CoreModule {}
