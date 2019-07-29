import { props, createAction } from '@ngrx/store';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

export const update<%= classify(name) %> = createAction(
  '[<%= classify(name) %> update modal] Update',
  props<{ data: { id: number; <%= camelize(name) %>: <%= classify(name) %> } }>()
);
