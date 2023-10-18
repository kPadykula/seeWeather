import * as mongoose from 'mongoose';
import { Localization } from '../localization/localization.schema';

export const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  isAdmin: Boolean,
  localizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Localization' },
  ],
});

export interface User extends Document {
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly localizations: Array<Localization>;
}

export interface Credentials {
  email: string;
  password: string;
}
