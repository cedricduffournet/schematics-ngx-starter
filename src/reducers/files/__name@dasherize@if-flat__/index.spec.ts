import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';

describe('<%= classify(name) %>Reducer ', () => {
  const initialState: from<%= pluralize(classify(name)) %>.<%= pluralize(classify(name)) %>State = {
    collection: {
      ids: [1, 2, 3],
      adding: true,
      added: true,
      deleting: true,
      deleted: true,
      loading: true,
      loaded: true<% if(paginated) { %>,
      totalItems: 0,
      config: {
        page: 1,
        itemsPerPage: 10
      }<%  } %>
    },
    <%= pluralize(camelize(name)) %>: {
      entities: {
        1: {
          id: 1,
          name: 'Name 1'
        },
        2: {
          id: 2,
          name: 'Name 2'
        },
        3: {
          id: 3,
          name: 'Name 3'
        }
      },
      selectedId: 1,
      updating: true,
      updated: true
    }
  };

  describe('Selectors', () => {
    describe('get<%= classify(name) %>EntitiesState', () => {
      it('should return the <%= pluralize(camelize(name)) %> state', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>EntitiesState.projector(initialState)
        ).toStrictEqual({
          entities: {
            1: {
              id: 1,
              name: 'Name 1'
            },
            2: {
              id: 2,
              name: 'Name 2'
            },
            3: {
              id: 3,
              name: 'Name 3'
            }
          },
          selectedId: 1,
          updating: true,
          updated: true
        });
      });
    });

    describe('get<%= classify(name) %>Entities', () => {
      it('should return the <%= pluralize(camelize(name)) %> entities', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>Entities.projector(initialState.<%= pluralize(camelize(name)) %>)
        ).toStrictEqual({
          1: {
            id: 1,
            name: 'Name 1'
          },
          2: {
            id: 2,
            name: 'Name 2'
          },
          3: {
            id: 3,
            name: 'Name 3'
          }
        });
      });
    });

    describe('get<%= classify(name) %>EntitiesUpdating', () => {
      it('should return the <%= pluralize(camelize(name)) %> updating', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>EntitiesUpdating.projector(
            initialState.<%= pluralize(camelize(name)) %>
          )
        ).toBe(true);
      });
    });

    describe('get<%= classify(name) %>EntitiesUpdated', () => {
      it('should return the <%= pluralize(camelize(name)) %> updated', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>EntitiesUpdated.projector(
            initialState.<%= pluralize(camelize(name)) %>
          )
        ).toBe(true);
      });
    });

    describe('get<%= classify(name) %>CollectionState', () => {
      it('should return the collection state', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionState.projector(initialState)
        ).toStrictEqual({
          ids: [1, 2, 3],
          adding: true,
          added: true,
          deleting: true,
          deleted: true,
          loading: true,
          loaded: true<% if(paginated) { %>,
          totalItems: 0,
          config: {
            page: 1,
            itemsPerPage: 10
          }<% } %>
        });
      });
    });

    describe('get<%= classify(name) %>Ids', () => {
      it('should return collection ids', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>Ids.projector(initialState.collection)
        ).toStrictEqual([1, 2, 3]);
      });
    });

    describe('get<%= classify(name) %>CollectionAdding', () => {
      it('should return  if collection adding', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionAdding.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('get<%= classify(name) %>CollectionAdded', () => {
      it('should return  if item in collection added', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionAdded.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('get<%= classify(name) %>CollectionDeleting', () => {
      it('should return the if collection deleting', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionDeleting.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('get<%= classify(name) %>CollectionDeleted', () => {
      it('should return the if item in collection deleted', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionDeleted.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('get<%= pluralize(classify(name)) %>', () => {
      it('should return the <%= pluralize(camelize(name)) %>', () => {
        expect(
          from<%= pluralize(classify(name)) %>.get<%= pluralize(classify(name)) %>.projector(
            initialState.<%= pluralize(camelize(name)) %>.entities,
            initialState.collection.ids
          )
        ).toStrictEqual([
          {
            id: 1,
            name: 'Name 1'
          },
          {
            id: 2,
            name: 'Name 2'
          },
          {
            id: 3,
            name: 'Name 3'
          }
        ]);
      });
    });

    describe('getSelected<%= classify(name) %>Id', () => {
      it('should return id of selected <%= camelize(name) %>', () => {
        expect(
          from<%= pluralize(classify(name)) %>.getSelected<%= classify(name) %>Id.projector(
            initialState.<%= pluralize(camelize(name)) %>
          )
        ).toBe(1);
      });
    });

    describe('getSelected<%= classify(name) %>', () => {
      it('should return selected <%= camelize(name) %>', () => {
        expect(
          from<%= pluralize(classify(name)) %>.getSelected<%= classify(name) %>.projector(
            initialState.<%= pluralize(camelize(name)) %>.entities,
            initialState.<%= pluralize(camelize(name)) %>.selectedId
          )
        ).toStrictEqual({
          id: 1,
          name: 'Name 1'
        });
      });
    });
  });
});
