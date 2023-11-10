import { createActionGroup, props } from '@ngrx/store';
import { MappedApiResponse } from '@app/shared/components/map/map';
import { Localization } from '@app/shared/models/localization';

export const coreActions = createActionGroup({
  source: 'Core',
  events: {
    'Set user name': props<{ name: string }>(),
    'Set user id': props<{ id: string }>(),
    'Set user localizations': props<{ localizations: Localization[] }>(),
    'Set new date': props<{ date: Date }>(),
    'Set selected localization pin': props<{
      localization: MappedApiResponse | undefined;
    }>(),
  },
});
