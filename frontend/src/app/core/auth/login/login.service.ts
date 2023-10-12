import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface ICredentialsForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Injectable()
export class LoginService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup<ICredentialsForm> {
    return this.fb.group({
      login: this.fb.control<string | null>(null, Validators.required),
      password: this.fb.control<string | null>(null, Validators.required),
    });
  }
}
