import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

export interface RegisterForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
  name: FormControl<null | string>;
}

@Injectable()
export class RegisterService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  getForm(): FormGroup<RegisterForm> {
    return this.fb.group({
      email: this.fb.control<null | string>(null, Validators.required),
      password: this.fb.control<null | string>(null, Validators.required),
      name: this.fb.control<null | string>(null, Validators.required),
    });
  }

  register(data: any): Observable<any> {
    return this.http.post('api/users', data);
  }
}
