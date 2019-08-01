import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';
import {
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>AddModalActions,
  <%= classify(name) %>DeleteModalActions,
  <%= classify(name) %>UpdateModalActions
} from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>ListViewComponent', () => {
  let store: MockStore<from<%= pluralize(classify(name)) %>.State>;
  let facade: <%= classify(name) %>Facade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [<%= classify(name) %>Facade, provideMockStore()]
    });

    store = TestBed.get(Store);
    facade = TestBed.get(<%= classify(name) %>Facade);
    spyOn(store, 'dispatch');
  });

  it('should dispatch load<%= pluralize(classify(name)) %>', () => {
    const action = <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>();
    facade.load<%= pluralize(classify(name)) %>();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showAdd<%= classify(name) %>Modal', () => {
    const action = <%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal();
    facade.showAdd<%= classify(name) %>Modal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdate<%= classify(name) %>Modal', () => {
    const action = <%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal();
    facade.showUpdate<%= classify(name) %>Modal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch select<%= classify(name) %>', () => {
    const action = <%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id: 1 });
    facade.select<%= classify(name) %>(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDelete<%= classify(name) %>Modal', () => {
    const action = <%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal();
    facade.showDelete<%= classify(name) %>Modal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch select<%= classify(name) %>', () => {
    const action = <%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id: 1 });
    facade.select<%= classify(name) %>(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch add<%= classify(name) %>', () => {
    const <%= camelize(name) %> = {
      id: 1,
      name: 'test'
    } as <%= classify(name) %>;

    const action = <%= classify(name) %>AddModalActions.add<%= classify(name) %>({ <%= camelize(name) %> });
    facade.add<%= classify(name) %>(<%= camelize(name) %>);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch delete<%= classify(name) %>', () => {
    const <%= camelize(name) %> = {
      id: 1,
      name: 'test'
    } as <%= classify(name) %>;

    const action = <%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>({ <%= camelize(name) %> });
    facade.delete<%= classify(name) %>(<%= camelize(name) %>);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch update<%= classify(name) %>', () => {
    const data = {
      id: 1,
      <%= camelize(name) %>: {
        name: 'test'
      } as <%= classify(name) %>
    };

    const action = <%= classify(name) %>UpdateModalActions.update<%= classify(name) %>({ data });
    facade.update<%= classify(name) %>(data);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
