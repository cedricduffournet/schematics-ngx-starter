import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { <%= classify(name) %>ItemComponent } from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>Item', () => {
  let fixture: ComponentFixture<<%= classify(name) %>ItemComponent>;
  let component: <%= classify(name) %>ItemComponent;
  const <%= camelize(name) %>: <%= classify(name) %> = {
    id: 1,
    name: 'testname'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule],
      declarations: [<%= classify(name) %>ItemComponent]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>ItemComponent);
    component = fixture.componentInstance;
    component.authorization = {
      create: false,
      update: false,
      delete: false
    };
    component.<%= camelize(name) %> = <%= camelize(name) %>;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit remove event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(<%= camelize(name) %>.id);
    expect(component.delete.emit).toHaveBeenCalledWith(<%= camelize(name) %>.id);
  });

  it('should emit edit event', () => {
    spyOn(component.update, 'emit');
    component.onUpdate(<%= camelize(name) %>.id);
    expect(component.update.emit).toHaveBeenCalledWith(<%= camelize(name) %>.id);
  });

  it('should display edit button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display remove button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
