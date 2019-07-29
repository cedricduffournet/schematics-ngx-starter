import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { ValidationActionModule } from '@app/shared/validation-action';

import { <%= classify(name) %>DeleteComponent } from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>Delete', () => {
  let fixture: ComponentFixture<<%= classify(name) %>DeleteComponent>;
  let component: <%= classify(name) %>DeleteComponent;
  const <%= camelize(name) %>: <%= classify(name) %> = {
    id: 1,
    name: 'testname1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ValidationActionModule],
      declarations: [<%= classify(name) %>DeleteComponent]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>DeleteComponent);
    component = fixture.componentInstance;
    component.<%= camelize(name) %> = <%= camelize(name) %>;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(<%= camelize(name) %>);
    expect(component.delete.emit).toHaveBeenCalledWith(<%= camelize(name) %>);
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should pass deleting to component', () => {
    component.deleting = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
