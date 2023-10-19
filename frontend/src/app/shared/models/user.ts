import { Localization } from './localization';

export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
  localizations: Array<Localization>;
}
