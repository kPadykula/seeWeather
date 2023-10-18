import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { CoreConstants, DatabaseConstants } from 'src/core/constants';
import { LocalizationSchema } from 'src/core/database/localization/localization.schema';

export const LocalizationProviders: Provider[] = [
  {
    provide: DatabaseConstants.LOCALIZATION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Localization', LocalizationSchema),
    inject: [CoreConstants.DATABASE_CONNECTION],
  },
];
