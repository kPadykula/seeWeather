import * as mongoose from 'mongoose';
import { CoreConstants } from '../constants';

export const databaseProviders = [
  {
    provide: CoreConstants.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(atlasDBConnectionString),
  },
];

const localDBConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/${process.env.MONGO_DB}?authMechanism=DEFAULT`;
const atlasDBConnectionString = `mongodb+srv://kacper123:kacper123@seeweather.03wg0xh.mongodb.net/?retryWrites=true&w=majority`;
