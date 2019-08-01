import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import {
  <%= classify(name) %>UpdateComponent,
  <%= classify(name) %>FormComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>Update', () => {
  let fixture: ComponentFixture<<%= classify(name) %>UpdateComponent>;
  let component: <%= classify(name) %>UpdateComponent;
  const <%= camelize(name) %>: <%= classify(name) %> = {
    id: 1,
    name: 'testname1'
  } as <%= classify(name) %>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [<%= classify(name) %>UpdateComponent, <%= classify(name) %>FormComponent]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>UpdateComponent);
    component = fixture.componentInstance;
    component.<%= camelize(name) %> = <%= camelize(name) %>;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event', () => {
    spyOn(component.update, 'emit');
    component.onSave({ name: 'nameupdated' } as <%= classify(name) %>);
    expect(component.update.emit).toHaveBeenCalledWith({
      id: <%= camelize(name) %>.id,
      <%= camelize(name) %>: { name: 'nameupdated' }
    });
  });

  it('should indicate <%= camelize(name) %> is updating', () => {
    component.updating = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });
});
