import { reducer } from '@app/<%= dasherize(name) %>/state/reducers/<%= dasherize(name) %>-collection.reducer';
import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers/<%= dasherize(name) %>-collection.reducer';

import {
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>AddModalActions,
  <%= classify(name) %>DeleteModalActions,
  <%= classify(name) %>ApiActions
} from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>CollectionReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD', () => {
    it('should set loading to true', () => {
      const action = <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>();
      const result = reducer(from<%= pluralize(classify(name)) %>.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS ', () => {
    it('should set loading to false, loaded to true and set <%= camelize(name) %> ids [1, 2]', () => {
      const initialState = {
        ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
        loading: true
      };

      const <%= pluralize(camelize(name)) %> = {
        entities: {
          1: {
            name: 'Name 1'
          },
          2: {
            name: 'Name 2'
          }
        },
        result: [1, 2]
      };
      const action = <%= classify(name) %>ApiActions.load<%= classify(name) %>Success({
        <%= pluralize(camelize(name)) %>
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_FAILURE ', () => {
    const initialState = {
      ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
      loading: true
    };

    it('should set loading to false, loaded to false', () => {
      const error = {
        message: 'error'
      };
      const action = <%= classify(name) %>ApiActions.load<%= classify(name) %>Failure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD', () => {
    it('should set adding to true on <%= classify(name) %>AddModalActions.add<%= classify(name) %>', () => {
      const <%= camelize(name) %> = {
        name: 'AddName'
      } as <%= classify(name) %>;
      const action = <%= classify(name) %>AddModalActions.add<%= classify(name) %>({
        <%= camelize(name) %>
      });
      const result = reducer(from<%= pluralize(classify(name)) %>.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    it('should set adding to false, added to true and add new <%= camelize(name) %> (3) to ids', () => {
      const initialState = {
        ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
        adding: true,
        ids: [1, 2]
      };
      const <%= camelize(name) %> = {
        entities: {
          3: {
            name: 'AddName'
          }
        },
        result: 3
      };
      const action = <%= classify(name) %>ApiActions.add<%= classify(name) %>Success({
        <%= camelize(name) %>
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_FAILURE & SHOW_MODAL_ADD', () => {
    const initialState = {
      ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
      adding: true,
      added: true
    };

    it('should set adding to false, added to false', () => {
      const error = {
        message: 'error'
      };
      const action = <%= classify(name) %>ApiActions.add<%= classify(name) %>Failure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set adding to false on <%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal', () => {
      const action = <%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE', () => {
    it('should set deleting to true', () => {
      const <%= camelize(name) %> = {
        id: 1,
        name: 'RemoveName'
      };
      const action = <%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>({
        <%= camelize(name) %>
      });
      const result = reducer(from<%= pluralize(classify(name)) %>.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_SUCCESS', () => {
    const initialState = {
      ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
      removing: true,
      ids: [1, 2]
    };

    it('should set deleting to false, deleted to true and remove civ<%= camelize(name) %>ility (1) form ids', () => {
      const id = 1;

      const action = <%= classify(name) %>ApiActions.delete<%= classify(name) %>Success({
        id
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_FAILURE & SHOW_MODAL_DELETE', () => {
    const initialState = {
      ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
      removing: true,
      removed: true
    };

    it('should set removing to false, remove to false', () => {
      const error = {
        message: 'error'
      };
      const action = <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set removing to false, remove to false on <%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal', () => {
      const action = <%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getIds', () => {
      it('should retrieve ids [1,2,3]', () => {
        const result = from<%= pluralize(classify(name)) %>.getIds({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          ids: [1, 2, 3]
        });
        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleting', () => {
      it('should retrieve removing false', () => {
        const result = from<%= pluralize(classify(name)) %>.getDeleting({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          deleting: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve removing true', () => {
        const result = from<%= pluralize(classify(name)) %>.getDeleting({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          deleting: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleted', () => {
      it('should retrieve deleted false', () => {
        const result = from<%= pluralize(classify(name)) %>.getDeleted({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          deleted: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve deleted true', () => {
        const result = from<%= pluralize(classify(name)) %>.getDeleted({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          deleted: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdding', () => {
      it('should retrieve adding false', () => {
        const result = from<%= pluralize(classify(name)) %>.getAdding({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          adding: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve adding true', () => {
        const result = from<%= pluralize(classify(name)) %>.getAdding({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          adding: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdded', () => {
      it('should retrieve added false', () => {
        const result = from<%= pluralize(classify(name)) %>.getAdded({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          added: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve added true', () => {
        const result = from<%= pluralize(classify(name)) %>.getAdded({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          added: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoaded', () => {
      it('should retrieve loaded false', () => {
        const result = from<%= pluralize(classify(name)) %>.getLoaded({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          loaded: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loaded true', () => {
        const result = from<%= pluralize(classify(name)) %>.getLoaded({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          loaded: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoading', () => {
      it('should retrieve loading false', () => {
        const result = from<%= pluralize(classify(name)) %>.getLoading({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          loading: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loading true', () => {
        const result = from<%= pluralize(classify(name)) %>.getLoading({
          ...from<%= pluralize(classify(name)) %>.INITIAL_STATE,
          loading: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
