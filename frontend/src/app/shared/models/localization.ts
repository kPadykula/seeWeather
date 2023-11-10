import { FormControl } from '@angular/forms';

export interface Localization {
  _id?: string;
  name: string;
  x: string;
  y: string;
  enable: boolean;
}

export interface LocalizationForm {
  name: FormControl<string | null>;
  x: FormControl<number | null>;
  y: FormControl<number | null>;
}
