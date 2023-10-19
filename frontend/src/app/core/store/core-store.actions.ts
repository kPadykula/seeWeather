import { createActionGroup, props } from '@ngrx/store';
import { Localization } from '@app/shared/models/localization';

export const coreActions = createActionGroup({
  source: 'Core',
  events: {
    'Set user name': props<{ name: string }>(),
    'Set user id': props<{ id: string }>(),
  },
});
