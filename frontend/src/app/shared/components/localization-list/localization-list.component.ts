import { Component } from '@angular/core';
import { AuthSelectors } from '@app/core/auth/auth-store';
import { CoreSelectors } from '@app/core/store';
import { Localization } from '@app/shared/models/localization';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalizationListService } from './localization-list.service';
import { combineLatest, of, switchMap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalizationAddComponent } from './localization-add.component';
import { coreActions } from '@app/core/store/core-store.actions';

@Component({
  selector: 'app-localization-list',
  templateUrl: './localization-list.component.html',
  styleUrls: ['./localization-list.component.scss'],
  providers: [LocalizationListService],
})
export class LocalizationListComponent {
  isAuth$ = this.store.select(AuthSelectors.isAuth);
  localizations$ = this.store.select(CoreSelectors.getUserLocalizations);

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: LocalizationListService,
    private dialogService: DialogService
  ) {}

  onAdd(): void {
    this.store.select(CoreSelectors.getUserId).subscribe((userId) => {
      this.dialogService
        .open(LocalizationAddComponent, {
          width: '400px',
          showHeader: false,
          data: {
            userId: userId,
          },
        })
        .onClose.subscribe((res) => {
          if (res.type === 'Success') {
            this.refreshList();
          }
        });
    });
  }

  onRemove(event: any, localization: Localization): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure to delete ${localization.name} localization?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store
          .select(CoreSelectors.getUserId)
          .pipe(
            switchMap((id) =>
              this.service.onRemove({
                userId: id ?? '',
                localizationId: localization._id ?? '',
              })
            )
          )
          .subscribe({
            next: () => {
              this.refreshList();
              this.messageService.add({
                severity: 'info',
                summary: 'Removing localization',
                detail: 'Localization removed successfully',
              });
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Removing localization error',
                detail: err.error.message,
              });
            },
          });
      },
    });
  }

  private refreshList(): void {
    this.store
      .select(CoreSelectors.getUserId)
      .pipe(
        switchMap((userId) =>
          combineLatest([
            of(userId),
            this.service.getLocalizations(userId ?? ''),
          ])
        )
      )
      .subscribe(([userId, localizations]) => {
        this.store.dispatch(
          coreActions.setUserLocalizations({ localizations })
        );
      });
  }
}
