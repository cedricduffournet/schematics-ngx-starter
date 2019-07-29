import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';

import {
  <%= classify(name) %>AddComponent,
  <%= classify(name) %>FormComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>Add', () => {
  let component: <%= classify(name) %>AddComponent;
  let fixture: ComponentFixture<<%= classify(name) %>AddComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [<%= classify(name) %>FormComponent, <%= classify(name) %>AddComponent]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>AddComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit a save event when form is submitted', () => {
    const <%= camelize(name) %> = {
      name: 'Name'
    } as <%= classify(name) %>;
    spyOn(component.add, 'emit');
    component.onSave(<%= camelize(name) %>);

    expect(component.add.emit).toHaveBeenCalledWith(<%= camelize(name) %>);
  });

  it('should emit a cancel event when form canceled', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should indicate to form <%= camelize(name) %> is processing', () => {
    component.adding = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should indicate to form <%= camelize(name) %> is not processing', () => {
    component.adding = false;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
