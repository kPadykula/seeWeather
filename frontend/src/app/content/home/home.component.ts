import { Component, OnInit } from '@angular/core';
import { AuthSelectors } from '@app/core/auth/auth-store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.isAuth)
      .pipe(take(1))
      .subscribe((isAuth) => (this.isAuth = isAuth));
  }
}
