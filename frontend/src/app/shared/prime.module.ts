import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  exports: [ButtonModule, InputTextModule, TooltipModule, CalendarModule],
  imports: [ButtonModule, InputTextModule, TooltipModule, CalendarModule],
})
export class PrimeNgModule {}
