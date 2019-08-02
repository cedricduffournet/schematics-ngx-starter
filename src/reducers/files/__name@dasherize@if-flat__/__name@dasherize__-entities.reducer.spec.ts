import { reducer } from '@app/<%= dasherize(name) %>/state/reducers/<%= dasherize(name) %>-entities.reducer';
import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers/<%= dasherize(name) %>-entities.reducer';

import {
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>UpdateModalActions,
  <%= classify(name) %>ApiActions
} from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>EntitiesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should return state with <%= camelize(name) %> entities', () => {
      const <%= pluralize(camelize(name)) %> = {
        entities: {
          <%= pluralize(camelize(name)) %>: {
            1: {
              name: 'Name1'
            } as <%= classify(name) %>,
            2: {
              name: 'Name2'
            } as <%= classify(name) %>
          }
        },
        result: [1, 2]
      };<% if(paginated) { %>

      const meta = {
      };<% } %>

      const action = <%= classify(name) %>ApiActions.load<%= classify(name) %>Success({
        <%= pluralize(camelize(name)) %><% if(paginated) { %>,
        meta<% } %>
      });
      const result = reducer(from<%= pluralize(classify(name)) %>.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE', () => {
    const id = 1;
    const <%= camelize(name) %> = {
      name: 'NameUpdated'
    } as <%= classify(name) %>;
    const data = { id, <%= camelize(name) %> };

    it('should set updating to true', () => {
      const action = <%= classify(name) %>UpdateModalActions.update<%= classify(name) %>({ data });
      const result = reducer(from<%= pluralize(classify(name)) %>.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_SUCCESS', () => {
    it('should update <%= camelize(name) %> id 1, upated should be true and updating false', () => {
      const <%= pluralize(camelize(name)) %> = {
        1: {
          id: 1,
          name: 'Name 1'
        } as <%= classify(name) %>,
        2: {
          id: 2,
          name: 'Name 2'
        } as <%= classify(name) %>
      };
      const initialState = {
        ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
        entities: <%= pluralize(camelize(name)) %>
      };

      const <%= camelize(name) %> = {
        entities: {
          <%= pluralize(camelize(name)) %>: {
            1: {
              name: 'Name 1 updated'
            }
          }
        },
        result: 1
      };
      const action = <%= classify(name) %>ApiActions.update<%= classify(name) %>Success({ <%= camelize(name) %> });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAILURE & SHOW_MODAL_UPDATE', () => {
    const initialState = {
      ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
      updating: true,
      updated: true,
      entities: {
        1: {
          id: 1,
          name: 'Name'
        } as <%= classify(name) %>
      }
    };

    it('should set updating to false', () => {
      const error = {
        message: 'error'
      };
      const action = <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure({ error });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should set updating to false, updated to false when show modal', () => {
      const action = <%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal();
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    const <%= pluralize(camelize(name)) %> = {
      1: {
        id: 1,
        name: 'Name 1'
      } as <%= classify(name) %>,
      2: {
        id: 2,
        name: 'Name 2'
      } as <%= classify(name) %>
    };
    const initialState = {
      ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
      entities: <%= pluralize(camelize(name)) %>
    };

    const <%= camelize(name) %> = {
      entities: {
        <%= pluralize(camelize(name)) %>: {
          3: {
            name: 'Name 3'
          }
        }
      },
      result: 3
    };

    it('should add a new <%= camelize(name) %> id 3', () => {
      const action = <%= classify(name) %>ApiActions.add<%= classify(name) %>Success({ <%= camelize(name) %> });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    const <%= pluralize(camelize(name)) %> = {
      1: {
        id: 1,
        name: 'Name 1'
      } as <%= classify(name) %>,
      2: {
        id: 2,
        name: 'Name 2'
      } as <%= classify(name) %>
    };
    const initialState = {
      ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
      entities: <%= pluralize(camelize(name)) %>
    };

    const id = 1;

    it('should set selected <%= camelize(name) %> (id 1)', () => {
      const action = <%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getEntities', () => {
      it('should return entities', () => {
        const result = from<%= pluralize(classify(name)) %>.getEntities({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          entities: {
            1: {
              id: 1,
              name: 'Name 1'
            } as <%= classify(name) %>,
            2: {
              id: 2,
              name: 'Name 2'
            } as <%= classify(name) %>
          }
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getSelectedId', () => {
      it('should return selected id (1)', () => {
        const result = from<%= pluralize(classify(name)) %>.getSelectedId({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          selectedId: 1
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdating', () => {
      it('should return updating true', () => {
        const result = from<%= pluralize(classify(name)) %>.getUpdating({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          updating: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdated', () => {
      it('should return updated true', () => {
        const result = from<%= pluralize(classify(name)) %>.getUpdated({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          updated: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
