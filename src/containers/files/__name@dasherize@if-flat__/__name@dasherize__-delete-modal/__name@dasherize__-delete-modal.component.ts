import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';
import { <%= classify(name) %>DeleteModalActions } from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-delete-modal',
  templateUrl: '<%= dasherize(name) %>-delete-modal.component.html'
})
export class <%= classify(name) %>DeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
  subscription: Subscription;
  selected<%= classify(name) %>$: Observable<<%= classify(name) %>>;

  constructor(
    public bsModalRef: BsModalRef,
    public store: Store<from<%= pluralize(classify(name)) %>.State>
  ) {}

  ngOnInit() {
    this.selected<%= classify(name) %>$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.getSelected<%= classify(name) %>)
    );
    this.deleted$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionDeleted)
    );
    this.deleting$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionDeleting)
    );

    this.subscription = this.deleted$
      .pipe(filter(deleted => deleted))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onDelete(<%= camelize(name) %>: <%= classify(name) %>) {
    this.store.dispatch(
      <%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>({ <%= camelize(name) %> })
    );
  }
}
