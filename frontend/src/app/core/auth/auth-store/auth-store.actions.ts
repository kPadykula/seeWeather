import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICredentials } from 'src/app/shared/models/credentials';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ credentials: ICredentials }>(),
    'Login successfuly': props<{ isAuth: boolean; authToken: string }>(),
    'Login fail': emptyProps(),
    Logout: emptyProps(),
  },
});
