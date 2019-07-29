import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { User } from '@app/user/models/User';
import { Authorization } from '@app/core/models/authorization.model';
import { <%= classify(name) %>ListViewActions } from '@app/<%= dasherize(name) %>/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';
import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';

@Component({
  selector: 'app-<%= dasherize(name) %>-list-view',
  templateUrl: './<%= dasherize(name) %>-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>ListViewComponent implements OnInit {
  <%= pluralize(camelize(name)) %>$: Observable<<%= classify(name) %>[]>;
  loggedUser$: Observable<User | null>;
  authorization$: Observable<Authorization>;

  public constructor(
    private store: Store<from<%= pluralize(classify(name)) %>.State & fromAuth.State>
  ) {}

  public ngOnInit() {
    this.<%= pluralize(camelize(name)) %>$ = this.store.pipe(select(from<%= pluralize(classify(name)) %>.get<%= pluralize(classify(name)) %>));
    this.loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.authorization$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>Authorization)
    );
    this.store.dispatch(<%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>());
  }

  onAdd() {
    this.store.dispatch(<%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal());
  }

  onUpdate(id: number) {
    this.store.dispatch(<%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id }));
    this.store.dispatch(<%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal());
  }

  onDelete(id: number): void {
    this.store.dispatch(<%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id }));
    this.store.dispatch(<%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal());
  }
}
