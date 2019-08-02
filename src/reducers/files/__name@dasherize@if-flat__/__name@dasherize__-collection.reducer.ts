import { createReducer, on } from '@ngrx/store';

import {
  <%= classify(name) %>AddModalActions,
  <%= classify(name) %>DeleteModalActions,
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>ApiActions
} from '@app/<%= dasherize(name) %>/state/actions';

export interface State {
  ids: number[];
  loading: boolean;
  loaded: boolean;
  deleting: boolean;
  deleted: boolean;
  adding: boolean;
  added: boolean;<% if(paginated) { %>
  totalItems: number;
  config: {
    page: number;
    itemsPerPage: number;
  };<% } %>
}

export const INITIAL_STATE: State = {
  ids: [],
  adding: false,
  added: false,
  deleting: false,
  deleted: false,
  loading: false,
  loaded: false<% if(paginated) { %>,
  totalItems: 0,
  config: {
    page: 1,
    itemsPerPage: 10
  }<% } %>
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(<%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(<%= classify(name) %>ApiActions.load<%= classify(name) %>Success, (state, { <%= pluralize(camelize(name)) %><% if(paginated) { %>, meta<% } %> }) => ({
    ...state,
    loading: false,
    loaded: true,
    ids: <%= pluralize(camelize(name)) %>.result<% if(paginated) { %>,
    totalItems: meta.totalItems<% } %>
  })),
  on(<%= classify(name) %>ApiActions.load<%= classify(name) %>Failure, state => ({
    ...state,
    loading: false,
    loaded: false
  })),
  on(<%= classify(name) %>AddModalActions.add<%= classify(name) %>, state => ({
    ...state,
    adding: true,
    added: false
  })),
  on(<%= classify(name) %>ApiActions.add<%= classify(name) %>Success, (state, { <%= camelize(name) %> }) => ({
    ...state,
    ids: [...state.ids, <%= camelize(name) %>.result],
    adding: false,
    added: true
  })),
  on(
    <%= classify(name) %>ApiActions.add<%= classify(name) %>Failure,
    <%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal,
    state => ({
      ...state,
      adding: false,
      added: false
    })
  ),
  on(<%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>, state => ({
    ...state,
    deleting: true,
    deleted: false
  })),
  on(<%= classify(name) %>ApiActions.delete<%= classify(name) %>Success, (state, { id }) => ({
    ...state,
    ids: state.ids.filter(<%= camelize(name) %>Id => <%= camelize(name) %>Id !== id),
    deleting: false,
    deleted: true
  })),
  on(
    <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure,
    <%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal,
    state => ({
      ...state,
      deleting: false,
      deleted: false
    })
  )<% if(paginated) { %>,
  on(ProductListViewActions.changePage, (state, { page }) => {
    const config = {
      ...state.config,
      page
    };

    return {
      ...state,
      config
    };
  })<% } %>
);

export const getIds = (state: State) => state.ids;
export const getDeleting = (state: State) => state.deleting;
export const getDeleted = (state: State) => state.deleted;
export const getAdding = (state: State) => state.adding;
export const getAdded = (state: State) => state.added;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;<% if(paginated) { %>
export const getConfig = (state: State) => state.config;
export const getTotalItems = (state: State) => state.totalItems;<% } %>
