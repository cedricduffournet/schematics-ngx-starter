import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { <%= classify(name) %>FormComponent } from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>Form', () => {
  let fixture: ComponentFixture<<%= classify(name) %>FormComponent>;
  let component: <%= classify(name) %>FormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [<%= classify(name) %>FormComponent]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>FormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if name not filled', () => {
    const <%= camelize(name) %> = {
      name: ''
    } as <%= classify(name) %>;

    fixture.detectChanges();
    component.<%= camelize(name) %>Form.setValue(<%= camelize(name) %>);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });


  it('should disable the form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event with new <%= camelize(name) %>, if the form is valid, when submitted', () => {
    const <%= camelize(name) %> = {name: 'test' };
    fixture.detectChanges();

    component.<%= camelize(name) %>Form.setValue(<%= camelize(name) %>);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).toHaveBeenCalledWith(<%= camelize(name) %>);
  });

  it('should emit cancel event when click cancel button', () => {
    fixture.detectChanges();

    spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should fill form with <%= camelize(name) %> value', () => {
    const <%= camelize(name) %> = {
      name: 'testName'
    } as <%= classify(name) %>;
    component.<%= camelize(name) %> = <%= camelize(name) %>;
    fixture.detectChanges();

    expect(component.<%= camelize(name) %>Form.value).toEqual(<%= camelize(name) %>);
  });
});
