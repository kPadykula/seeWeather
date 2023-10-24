import { Component, Input, OnInit } from '@angular/core';
import { AuthSelectors } from '@app/core/auth/auth-store';
import { CoreSelectors } from '@app/core/store';
import { Store } from '@ngrx/store';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-welcome',
  template: ` <div class="welcome-container">
    <app-card>
      <div class="name no-selectable">Good to see you again, {{ name }}!</div>
    </app-card>
  </div>`,
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @Input() name: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.isAuth)
      .pipe(
        take(1),
        switchMap((isAuth) =>
          isAuth ? this.store.select(CoreSelectors.getUserName) : EMPTY
        )
      )
      .subscribe((userName) => {
        if (userName) {
          this.name = userName;
        }
      });
  }
}
