import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    TooltipModule,
    CalendarModule,
    AccordionModule,
    ConfirmPopupModule,
    ToastModule,
    DialogModule,
    DynamicDialogModule,
    InputNumberModule,
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    TooltipModule,
    CalendarModule,
    AccordionModule,
    ConfirmPopupModule,
    ToastModule,
    DialogModule,
    DynamicDialogModule,
    InputNumberModule,
  ],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class PrimeNgModule {}
