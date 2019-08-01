import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';

@Component({
  selector: 'app-<%= dasherize(name) %>-delete-modal',
  templateUrl: '<%= dasherize(name) %>-delete-modal.component.html'
})
export class <%= classify(name) %>DeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
  subscription: Subscription;
  selected<%= classify(name) %>$: Observable<<%= classify(name) %>>;

  constructor(public bsModalRef: BsModalRef, public facade: <%= classify(name) %>Facade) {}

  ngOnInit() {
    this.selected<%= classify(name) %>$ = this.facade.selected$;
    this.deleted$ = this.facade.deleted$;
    this.deleting$ = this.facade.deleting$;

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
    this.facade.delete<%= classify(name) %>(<%= camelize(name) %>);
  }
}
