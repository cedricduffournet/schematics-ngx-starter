import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';
import { <%= classify(name) %>UpdateModalActions } from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-update-modal',
  templateUrl: '<%= dasherize(name) %>-update-modal.component.html'
})
export class <%= classify(name) %>UpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
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
    this.updated$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>EntitiesUpdated)
    );
    this.updating$ = this.store.pipe(
      select(from<%= pluralize(classify(name)) %>.get<%= classify(name) %>EntitiesUpdating)
    );

    this.subscription = this.updated$
      .pipe(filter(updated => updated))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onUpdate(data: { id: number; <%= camelize(name) %>: <%= classify(name) %> }) {
    this.store.dispatch(<%= classify(name) %>UpdateModalActions.update<%= classify(name) %>({ data }));
  }
}
