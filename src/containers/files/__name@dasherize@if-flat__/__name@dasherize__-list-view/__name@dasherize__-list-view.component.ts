import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

@Component({
  selector: 'app-<%= dasherize(name) %>-list-view',
  templateUrl: './<%= dasherize(name) %>-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>ListViewComponent implements OnInit {
  <%= pluralize(camelize(name)) %>$: Observable<<%= classify(name) %>[]>;
  canUpdate$: Observable<boolean>;
  canDelete$: Observable<boolean>;
  canCreate$: Observable<boolean>;<% if(paginated) { %>
  config$: Observable<any>;
  totalItems$: Observable<number>;<% } %>

  public constructor(
    private facade: <%= classify(name) %>Facade,
    private authFacade: AuthFacade
  ) {}

  public ngOnInit() {
    this.<%= pluralize(camelize(name)) %>$ = this.facade.<%= pluralize(camelize(name)) %>$;
    this.canCreate$ = this.authFacade.isAuthorized(['ROLE_<%= underscore(name).toUpperCase() %>_CREATE']);
    this.canDelete$ = this.authFacade.isAuthorized(['ROLE_<%= underscore(name).toUpperCase() %>_DELETE']);
    this.canUpdate$ = this.authFacade.isAuthorized(['ROLE_<%= underscore(name).toUpperCase() %>_EDIT']);<% if(paginated) { %>
    this.config$ = this.facade.config$;
    this.totalItems$ = this.facade.totalItems$;<% } %>
    this.facade.load<%= pluralize(classify(name)) %>();
  }

  onAdd() {
    this.facade.showAdd<%= classify(name) %>Modal();
  }

  onUpdate(id: number) {
    this.facade.select<%= classify(name) %>(id);
    this.facade.showUpdate<%= classify(name) %>Modal();
  }

  onDelete(id: number): void {
    this.facade.select<%= classify(name) %>(id);
    this.facade.showDelete<%= classify(name) %>Modal();
  }
<% if(paginated) { %>
  onPageChanged(page: number) {
    this.facade.changePage(page);
  }<% } %>
}
