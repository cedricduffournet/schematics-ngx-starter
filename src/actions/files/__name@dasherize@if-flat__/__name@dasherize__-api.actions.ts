import { props, createAction } from '@ngrx/store';

import { NormalizedData } from '@app/shared/models/normalized.model';

export const load<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %> API] Load SUCCESS',
  props<{ <%= pluralize(camelize(name)) %>: NormalizedData<% if(paginated) { %>, meta: any <% } %> }>()
);

export const load<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %> API] Load FAILURE',
  props<{ error: any }>()
);

export const add<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %> API] Add SUCCESS',
  props<{ <%= camelize(name) %>: NormalizedData }>()
);

export const add<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %> API] Add FAILURE',
  props<{ error: any }>()
);

export const update<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %> API] Update  SUCCESS',
  props<{ <%= camelize(name) %>: NormalizedData }>()
);

export const update<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %> API] Update FAILURE',
  props<{ error: any }>()
);

export const delete<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %> API] Delete SUCCESS',
  props<{ id: number }>()
);

export const delete<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %> API] Delete FAILURE',
  props<{ error: any }>()
);
