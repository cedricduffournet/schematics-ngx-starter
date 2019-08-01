import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { ButtonModule } from '@app/shared/button';
import {
  <%= classify(name) %>ItemsComponent,
  <%= classify(name) %>ItemComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>Items', () => {
  let fixture: ComponentFixture<<%= classify(name) %>ItemsComponent>;
  let component: <%= classify(name) %>ItemsComponent;
  const <%= pluralize(camelize(name)) %>: <%= classify(name) %>[] = [
    {
      id: 1,
      name: 'testname1'
    } as <%= classify(name) %>,
    {
      id: 2,
      name: 'testname2'
    } as <%= classify(name) %>
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule, ButtonModule],
      declarations: [<%= classify(name) %>ItemsComponent, <%= classify(name) %>ItemComponent]
    });
    fixture = TestBed.createComponent(<%= classify(name) %>ItemsComponent);
    component = fixture.componentInstance;
    component.<%= pluralize(camelize(name)) %> = <%= pluralize(camelize(name)) %>;
    component.authorization = {
      create: false,
      update: false,
      delete: false
    };
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(<%= pluralize(camelize(name)) %>[0].id);
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should emit edit event', () => {
    spyOn(component.update, 'emit');
    component.onUpdate(<%= pluralize(camelize(name)) %>[1].id);
    expect(component.update.emit).toHaveBeenCalledWith(2);
  });

  it('should emit add event', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith('add');
  });

  it('should display add button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not display add button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: false
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
