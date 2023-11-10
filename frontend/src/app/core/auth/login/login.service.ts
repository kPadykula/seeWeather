import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICredentials } from '@app/shared/models/credentials';
import { Localization } from '@app/shared/models/localization';
import { IUser } from '@app/shared/models/user';
import { Observable } from 'rxjs';

export interface ICredentialsForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Injectable()
export class LoginService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  createForm(): FormGroup<ICredentialsForm> {
    return this.fb.group({
      email: this.fb.control<string | null>(null, Validators.required),
      password: this.fb.control<string | null>(null, Validators.required),
    });
  }

  login(credentials: ICredentials): Observable<Required<IUser>> {
    return this.http.post<Required<IUser>>('api/auth', credentials);
  }

  getLocalizations(id: string): Observable<Localization[]> {
    return this.http.get<Localization[]>(`api/users/localizations/${id}`);
  }
}
