import { IUser } from '@app/shared/models/user';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICredentials } from 'src/app/shared/models/credentials';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ credentials: ICredentials }>(),
    'Login successfully': props<{ user: IUser }>(),
    'Login fail': emptyProps(),
    Logout: emptyProps(),
  },
});
