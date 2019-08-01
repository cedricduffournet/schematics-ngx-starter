import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>AddModalActions,
  <%= classify(name) %>DeleteModalActions,
  <%= classify(name) %>UpdateModalActions
} from '@app/<%= dasherize(name) %>/state/actions';
import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Injectable()
export class <%= classify(name) %>Facade {
  <%= pluralize(camelize(name)) %>$ = this.store.pipe(select(from<%= pluralize(classify(name)) %>.get<%= pluralize(classify(name)) %>));
  added$ = this.store.pipe(select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionAdded));
  adding$ = this.store.pipe(select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionAdding));
  updated$ = this.store.pipe(select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>EntitiesUpdated));
  updating$ = this.store.pipe(
    select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>EntitiesUpdating)
  );
  deleted$ = this.store.pipe(
    select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionDeleted)
  );
  deleting$ = this.store.pipe(
    select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionDeleting)
  );
  selected$ = this.store.pipe(select(from<%= pluralize(classify(name)) %>.getSelected<%= classify(name) %>));

  constructor(private store: Store<from<%= pluralize(classify(name)) %>.State>) {}

  load<%= pluralize(classify(name)) %>() {
    this.store.dispatch(<%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>());
  }

  showAdd<%= classify(name) %>Modal() {
    this.store.dispatch(<%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal());
  }

  select<%= classify(name) %>(id: number) {
    this.store.dispatch(<%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id }));
  }

  showUpdate<%= classify(name) %>Modal() {
    this.store.dispatch(<%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal());
  }

  showDelete<%= classify(name) %>Modal() {
    this.store.dispatch(<%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal());
  }

  add<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    this.store.dispatch(<%= classify(name) %>AddModalActions.add<%= classify(name) %>({ <%= camelize(name) %> }));
  }

  delete<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    this.store.dispatch(
      <%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>({ <%= camelize(name) %> })
    );
  }

  update<%= classify(name) %>(data: { id: number; <%= camelize(name) %>: <%= classify(name) %> }) {
    this.store.dispatch(<%= classify(name) %>UpdateModalActions.update<%= classify(name) %>({ data }));
  }
}
