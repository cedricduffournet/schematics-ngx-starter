import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  <%= classify(name) %>ItemComponent,
  <%= classify(name) %>ItemsComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %>ListViewComponent } from '@app/<%= dasherize(name) %>/containers';
import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';
import { <%= classify(name) %>ListViewActions } from '@app/<%= dasherize(name) %>/state/actions';
import { SharedModule } from '@app/shared/shared.module';

describe('<%= classify(name) %>ListViewComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>ListViewComponent>;
  let component: <%= classify(name) %>ListViewComponent;
  let store: MockStore<from<%= pluralize(classify(name)) %>.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        <%= classify(name) %>ListViewComponent,
        <%= classify(name) %>ItemsComponent,
        <%= classify(name) %>ItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: from<%= pluralize(classify(name)) %>.get<%= pluralize(classify(name)) %>,
              value: []
            },
            {
              selector: from<%= pluralize(classify(name)) %>.get<%= classify(name) %>Authorization,
              value: {
                create: true,
                delete: true,
                update: true
              }
            }
          ]
        })
      ]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>ListViewComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch load<%= pluralize(classify(name)) %> on init', () => {
    const action = <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showAdd<%= classify(name) %>Modal on add event', () => {
    const action = <%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal();
    component.onAdd();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdate<%= classify(name) %>Modal on update event', () => {
    const action = <%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal();
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch select<%= classify(name) %> on update event', () => {
    const action = <%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id: 1 });
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDelete<%= classify(name) %>Modal on update event', () => {
    const action = <%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal();
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch select<%= classify(name) %> on deletee event', () => {
    const action = <%= classify(name) %>ListViewActions.select<%= classify(name) %>({ id: 1 });
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
