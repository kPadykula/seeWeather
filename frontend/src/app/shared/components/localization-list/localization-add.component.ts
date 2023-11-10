import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalizationListService } from './localization-list.service';
import { FormGroup } from '@angular/forms';
import {
  Localization,
  LocalizationForm,
} from '@app/shared/models/localization';
import { MessageService } from 'primeng/api';

@Component({
  template: `
    <div class="controls-container" [formGroup]="form">
      <div class="control">
        <label htmlFor="field-name">Name</label>
        <input
          pInputText
          id="field-name"
          type="text"
          aria-describedby="name-help"
          formControlName="name"
        />
      </div>
      <div class="control">
        <label htmlFor="">Latitude</label>
        <p-inputNumber
          inputId="field-x"
          formControlName="x"
          aria-describedby="x-help"
          mode="decimal"
          locale="en-US"
          [minFractionDigits]="2"
          [maxFractionDigits]="6"
        ></p-inputNumber>
      </div>
      <div class="control">
        <label htmlFor="field-y">Longitude</label>
        <p-inputNumber
          inputId="field-y"
          formControlName="y"
          aria-describedby="y-help"
          mode="decimal"
          locale="en-US"
          [maxFractionDigits]="6"
          [minFractionDigits]="2"
        ></p-inputNumber>
      </div>
    </div>
    <div class="actions">
      <button pButton (click)="onSave()" [disabled]="form.invalid">Save</button>
      <button pButton (click)="onClose()">Close</button>
    </div>
  `,
  styles: [
    `
      .actions {
        width: 100%;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        align-items: center;
      }

      .controls-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        .control {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          input {
            width: 100%;
          }

          ::ng-deep p-inputnumber {
            width: 100%;
            .p-inputnumber {
              width: 100%;
            }
          }

          & > label {
            width: 100%;
            justify-self: self-start;
            padding-bottom: 5px;
          }
        }
      }
    `,
  ],
  providers: [LocalizationListService],
})
export class LocalizationAddComponent {
  form: FormGroup<LocalizationForm> = this.service.getAddLocalizationForm();
  userId: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private service: LocalizationListService,
    private messageService: MessageService
  ) {
    this.userId = this.config.data.userId;
  }

  onClose(): void {
    this.ref.close();
  }

  onSave(): void {
    if (this.form.invalid) {
      return;
    }

    const localization: Localization = {
      name: this.form.controls.name.value ?? '',
      x: this.form.controls.x.value?.toString() ?? '',
      y: this.form.controls.y.value?.toString() ?? '',
      enable: true,
    };

    this.service.onAdd(localization, this.userId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Adding Localization',
          detail: 'Localization added successfully',
        });

        this.ref.close({
          type: 'Success',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Adding Localization error',
          detail: err.error.message,
        });
      },
    });
  }
}
