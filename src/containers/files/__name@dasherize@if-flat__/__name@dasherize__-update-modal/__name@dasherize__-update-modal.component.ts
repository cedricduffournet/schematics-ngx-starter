import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';

@Component({
  selector: 'app-<%= dasherize(name) %>-update-modal',
  templateUrl: '<%= dasherize(name) %>-update-modal.component.html'
})
export class <%= classify(name) %>UpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selected<%= classify(name) %>$: Observable<<%= classify(name) %>>;

  constructor(public bsModalRef: BsModalRef, public facade: <%= classify(name) %>Facade) {}

  ngOnInit() {
    this.selected<%= classify(name) %>$ = this.facade.selected$;
    this.updated$ = this.facade.updated$;
    this.updating$ = this.facade.updating$;

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
     this.facade.update<%= classify(name) %>(data);
  }
}
