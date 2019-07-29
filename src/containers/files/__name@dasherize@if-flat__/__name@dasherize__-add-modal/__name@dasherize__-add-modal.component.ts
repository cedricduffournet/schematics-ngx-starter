import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';
import { <%= classify(name) %>AddModalActions } from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-add-modal',
  templateUrl: '<%= dasherize(name) %>-add-modal.component.html'
})
export class <%= classify(name) %>AddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;
  selected<%= classify(name) %>$: Observable<<%= classify(name) %>>;

  constructor(
    public bsModalRef: BsModalRef,
    private store: Store<from<%= pluralize(classify(name)) %>.State>
  ) {}

  ngOnInit() {
    this.added$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionAdded)
    );
    this.adding$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionAdding)
    );

    this.subscription = this.added$
      .pipe(filter(added => added))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onAdd(<%= camelize(name) %>: <%= classify(name) %>) {
    this.store.dispatch(<%= classify(name) %>AddModalActions.add<%= classify(name) %>({ <%= camelize(name) %> }));
  }
}
