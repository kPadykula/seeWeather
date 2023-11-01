import { Component, HostListener } from '@angular/core';
import { ICredentialsForm, LoginService } from './login.service';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../auth-store/auth-store.actions';
import { ICredentials } from '@app/shared/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent {
  @HostListener('keydown', ['$event']) onKeyDown = (e: any) => {
    if (e.keyCode === 13 && e.key === 'Enter') {
      this.onSubmit();
    }
  };

  form: FormGroup<ICredentialsForm> = this.service.createForm();

  constructor(private service: LoginService, private store: Store) {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const credentials: ICredentials = {
      email: this.form.controls.email.value ?? '',
      password: this.form.controls.password.value ?? '',
    };

    this.store.dispatch(authActions.login({ credentials }));
  }
}
