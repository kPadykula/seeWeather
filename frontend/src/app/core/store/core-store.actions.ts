import { createActionGroup, props } from '@ngrx/store';

export const coreActions = createActionGroup({
  source: 'Core',
  events: {
    'Set user name': props<{ name: string }>(),
  },
});
