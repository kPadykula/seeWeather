import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { CoreConstants, DatabaseConstants } from 'src/core/constants';
import { UserSchema } from 'src/core/database/user/user.schema';

export const UsersProviders: Provider[] = [
  {
    provide: DatabaseConstants.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [CoreConstants.DATABASE_CONNECTION],
  },
];
