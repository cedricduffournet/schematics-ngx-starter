import { TestBed, ComponentFixture } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  <%= classify(name) %>ItemComponent,
  <%= classify(name) %>ItemsComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %>ListViewComponent } from '@app/<%= dasherize(name) %>/containers';
import { SharedModule } from '@app/shared/shared.module';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

describe('<%= classify(name) %>ListViewComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>ListViewComponent>;
  let component: <%= classify(name) %>ListViewComponent;
  let facade: <%= classify(name) %>Facade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        <%= classify(name) %>ListViewComponent,
        <%= classify(name) %>ItemsComponent,
        <%= classify(name) %>ItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore(),
        <%= classify(name) %>Facade,
        AuthFacade
      ]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>ListViewComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(<%= classify(name) %>Facade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should load<%= classify(name) %> on init', () => {
    spyOn(facade, 'load<%= pluralize(classify(name)) %>');
    fixture.detectChanges();
    expect(facade.load<%= pluralize(classify(name)) %>).toHaveBeenCalledWith();
  });

  it('should call showAdd<%= classify(name) %>Modal on add event', () => {
    spyOn(facade, 'showAdd<%= classify(name) %>Modal');
    component.onAdd();
    expect(facade.showAdd<%= classify(name) %>Modal).toHaveBeenCalledWith();
  });

  it('should call showUpdate<%= classify(name) %>Modal on update event', () => {
    spyOn(facade, 'showUpdate<%= classify(name) %>Modal');
    component.onUpdate(1);
    expect(facade.showUpdate<%= classify(name) %>Modal).toHaveBeenCalledWith();
  });

  it('should call select<%= classify(name) %> on update event', () => {
    spyOn(facade, 'select<%= classify(name) %>');
    component.onUpdate(1);
    expect(facade.select<%= classify(name) %>).toHaveBeenCalledWith(1);
  });

  it('should call showDelete<%= classify(name) %>Modal on update event', () => {
    spyOn(facade, 'showDelete<%= classify(name) %>Modal');
    component.onDelete(1);
    expect(facade.showDelete<%= classify(name) %>Modal).toHaveBeenCalledWith();
  });

  it('should call select<%= classify(name) %> on delete event', () => {
    spyOn(facade, 'select<%= classify(name) %>');
    component.onDelete(1);
    expect(facade.select<%= classify(name) %>).toHaveBeenCalledWith(1);
  });
});
