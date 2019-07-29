import { createReducer, on } from '@ngrx/store';

import { EntityState } from '@app/shared/models/EntityState';
import {
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>ApiActions,
  <%= classify(name) %>UpdateModalActions
} from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { NormalizedData } from '@app/shared/models/normalized.model';

export type <%= classify(name) %>Entities = EntityState<<%= classify(name) %>>;

export interface State {
  entities: <%= classify(name) %>Entities;
  selectedId: number | null;
  updating: boolean;
  updated: boolean;
}

export const INITIAL_STATE: State = {
  entities: {},
  selectedId: null,
  updating: false,
  updated: false
};

function update<%= classify(name) %>(state: State, <%= camelize(name) %>: NormalizedData): State {
  const id: number = <%= camelize(name) %>.result;
  return {
    ...state,
    entities: {
      ...state.entities,
      [id]: <%= camelize(name) %>.entities.<%= pluralize(camelize(name)) %>[id]
    },
    updated: true,
    updating: false
  };
}
export const reducer = createReducer(
  INITIAL_STATE,
  on(<%= classify(name) %>ApiActions.load<%= classify(name) %>Success, (state, { <%= pluralize(camelize(name)) %> }) => ({
    ...state,
    entities: <%= pluralize(camelize(name)) %>.entities.<%= pluralize(camelize(name)) %>
  })),
  on(<%= classify(name) %>UpdateModalActions.update<%= classify(name) %>, state => ({
    ...state,
    updated: false,
    updating: true
  })),
  on(<%= classify(name) %>ApiActions.update<%= classify(name) %>Success, (state, { <%= camelize(name) %> }) =>
    update<%= classify(name) %>(state, <%= camelize(name) %>)
  ),
  on(
    <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure,
    <%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal,
    state => ({
      ...state,
      updating: false,
      updated: false
    })
  ),
  on(<%= classify(name) %>ApiActions.add<%= classify(name) %>Success, (state, { <%= camelize(name) %> }) => ({
    ...state,
    entities: {
      ...state.entities,
      ...<%= camelize(name) %>.entities.<%= pluralize(camelize(name)) %>
    }
  })),
  on(<%= classify(name) %>ListViewActions.select<%= classify(name) %>, (state, { id }) => ({
    ...state,
    selectedId: id
  }))
);

export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId as number;
export const getUpdating = (state: State) => state.updating;
export const getUpdated = (state: State) => state.updated;
