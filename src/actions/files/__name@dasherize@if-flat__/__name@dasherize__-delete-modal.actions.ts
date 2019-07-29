import { props, createAction } from '@ngrx/store';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

export const delete<%= classify(name) %> = createAction(
  '[<%= classify(name) %> delete modal] Delete',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);
