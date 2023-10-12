import { Component, HostListener } from '@angular/core';
import { ICredentialsForm, LoginService } from './login.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class LoginComponent {
  @HostListener('keydown', ['$event']) onKeyDown = (e: any) => {
    if (e.keyCode === 13 && e.key === 'Enter') {
      this.onSubmit();
    }
  };

  form: FormGroup<ICredentialsForm> = this.service.createForm();

  constructor(private service: LoginService) {}

  onSubmit() {
    console.log(this.form.getRawValue());
  }
}
