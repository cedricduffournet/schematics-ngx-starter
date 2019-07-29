import { props, createAction } from '@ngrx/store';

export const load<%= pluralize(classify(name)) %> = createAction('[<%= classify(name) %> list view] Load list');

export type displayType = 'list' | 'add' | 'update' | 'delete';

export const showAdd<%= classify(name) %>Modal = createAction(
  '[<%= classify(name) %> list view] Show add modal'
);

export const showUpdate<%= classify(name) %>Modal = createAction(
  '[<%= classify(name) %> list view] Show update modal'
);

export const showDelete<%= classify(name) %>Modal = createAction(
  '[<%= classify(name) %> list view] Show delete modal'
);

export const select<%= classify(name) %> = createAction(
  '[<%= classify(name) %> list view] Select item',
  props<{ id: number }>()
);
