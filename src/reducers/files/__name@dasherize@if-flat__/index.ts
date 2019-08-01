import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';

import * as fromRoot from '@app/core/state/reducers';
import * as from<%= classify(name) %>Collection from '@app/<%= dasherize(name) %>/state/reducers/<%= dasherize(name) %>-collection.reducer';
import * as from<%= classify(name) %>Entities from '@app/<%= dasherize(name) %>/state/reducers/<%= dasherize(name) %>-entities.reducer';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

export interface <%= pluralize(classify(name)) %>State {
  collection: from<%= classify(name) %>Collection.State;
  <%= pluralize(camelize(name)) %>: from<%= classify(name) %>Entities.State;
}

export interface State extends fromRoot.State {
  <%= pluralize(camelize(name)) %>: <%= pluralize(classify(name)) %>State;
}

export function reducers(state: <%= pluralize(classify(name)) %>State | undefined, action: Action) {
  return combineReducers({
    collection: from<%= classify(name) %>Collection.reducer,
    <%= pluralize(camelize(name)) %>: from<%= classify(name) %>Entities.reducer
  })(state, action);
}

export const select<%= pluralize(classify(name)) %>State = createFeatureSelector<
  State,
  <%= pluralize(classify(name)) %>State
>('<%= pluralize(camelize(name)) %>');

export const get<%= classify(name) %>EntitiesState = createSelector(
  select<%= pluralize(classify(name)) %>State,
  state => state.<%= pluralize(camelize(name)) %>
);

export const get<%= classify(name) %>Entities = createSelector(
  get<%= classify(name) %>EntitiesState,
  from<%= classify(name) %>Entities.getEntities
);

export const get<%= classify(name) %>EntitiesUpdating = createSelector(
  get<%= classify(name) %>EntitiesState,
  from<%= classify(name) %>Entities.getUpdating
);

export const get<%= classify(name) %>EntitiesUpdated = createSelector(
  get<%= classify(name) %>EntitiesState,
  from<%= classify(name) %>Entities.getUpdated
);

export const get<%= classify(name) %>CollectionState = createSelector(
  select<%= pluralize(classify(name)) %>State,
  state => state.collection
);
export const get<%= classify(name) %>Ids = createSelector(
  get<%= classify(name) %>CollectionState,
  from<%= classify(name) %>Collection.getIds
);
export const get<%= classify(name) %>CollectionAdding = createSelector(
  get<%= classify(name) %>CollectionState,
  from<%= classify(name) %>Collection.getAdding
);
export const get<%= classify(name) %>CollectionAdded = createSelector(
  get<%= classify(name) %>CollectionState,
  from<%= classify(name) %>Collection.getAdded
);
export const get<%= classify(name) %>CollectionDeleting = createSelector(
  get<%= classify(name) %>CollectionState,
  from<%= classify(name) %>Collection.getDeleting
);
export const get<%= classify(name) %>CollectionDeleted = createSelector(
  get<%= classify(name) %>CollectionState,
  from<%= classify(name) %>Collection.getDeleted
);

export const get<%= pluralize(classify(name)) %> = createSelector(
  get<%= classify(name) %>Entities,
  get<%= classify(name) %>Ids,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getSelected<%= classify(name) %>Id = createSelector(
  get<%= classify(name) %>EntitiesState,
  from<%= classify(name) %>Entities.getSelectedId
);

export const getSelected<%= classify(name) %> = createSelector(
  get<%= classify(name) %>Entities,
  getSelected<%= classify(name) %>Id,
  (<%= camelize(name) %>Entities, <%= camelize(name) %>Id): <%= classify(name) %> => {
    return <%= camelize(name) %>Entities[<%= camelize(name) %>Id];
  }
);
