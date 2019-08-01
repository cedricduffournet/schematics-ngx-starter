import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';

@Component({
  selector: 'app-<%= dasherize(name) %>-add-modal',
  templateUrl: '<%= dasherize(name) %>-add-modal.component.html'
})
export class <%= classify(name) %>AddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private facade: <%= classify(name) %>Facade
  ) {}

  ngOnInit() {
    this.added$ = this.facade.added$;
    this.adding$ = this.facade.adding$;

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
    this.facade.add<%= classify(name) %>(<%= camelize(name) %>);
  }
}
