import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    required: [true, 'An email address is required.'],
    validate: validateEmail,
  },
  isAdmin: Boolean,
  localizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Localization' },
  ],
});

async function validateEmail(email: String) {
  const user = await this.constructor.findOne({ email });
  if (user)
    throw new Error('A user is already registered with this email address.');
}

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly localizations: Array<mongoose.Schema.Types.ObjectId>;
}

export interface LocalizationAssign {
  localization: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}

export interface Credentials {
  email: string;
  password: string;
}
