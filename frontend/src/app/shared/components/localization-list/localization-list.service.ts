import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Localization,
  LocalizationForm,
} from '@app/shared/models/localization';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class LocalizationListService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  onRemove(body: { userId: string; localizationId: string }) {
    return this.http.delete('api/users/localizations', { body });
  }

  onAdd(body: Localization, userId: string) {
    return this.http.post<Localization>('api/localizations', body).pipe(
      switchMap((res) =>
        this.http.put('api/users/assign', {
          user: userId,
          localization: res._id,
        })
      )
    );
  }

  getAddLocalizationForm(): FormGroup<LocalizationForm> {
    return this.fb.group({
      name: this.fb.control<string | null>(null, Validators.required),
      x: this.fb.control<number | null>(null, Validators.required),
      y: this.fb.control<number | null>(null, Validators.required),
    });
  }

  getLocalizations(id: string): Observable<Localization[]> {
    return this.http.get<Localization[]>(`api/users/localizations/${id}`);
  }
}
