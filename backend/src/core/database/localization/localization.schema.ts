import * as mongoose from 'mongoose';
export const LocalizationSchema = new mongoose.Schema({
  name: String,
  x: String,
  y: String,
  enable: Boolean,
});

export interface Localization extends Document {
  readonly name: string;
  readonly x: string;
  readonly y: string;
  readonly enable: boolean;
}
