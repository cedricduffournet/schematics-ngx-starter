import { props, createAction } from '@ngrx/store';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

export const add<%=classify(name)%> = createAction(
  '[<%= classify(name) %> add  modal] Add',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);
