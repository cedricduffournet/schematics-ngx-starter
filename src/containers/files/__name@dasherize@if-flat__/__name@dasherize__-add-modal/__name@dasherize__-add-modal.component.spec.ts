import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { <%= classify(name) %>AddModalComponent } from '@app/<%= dasherize(name) %>/containers';
import {
  <%= classify(name) %>AddComponent,
  <%= classify(name) %>FormComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';

describe('<%= classify(name) %>AddModalComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>AddModalComponent>;
  let component: <%= classify(name) %>AddModalComponent;
  let facade: <%= classify(name) %>Facade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        <%= classify(name) %>AddComponent,
        <%= classify(name) %>AddModalComponent,
        <%= classify(name) %>FormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ReactiveFormsModule,
        ModalWrapperModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: <%= classify(name) %>Facade,
          useValue: {
            added$: of(false),
            add<%= classify(name) %>: jest.fn()
          }
        }
      ]
    });
    facade = TestBed.get(<%= classify(name) %>Facade);
    fixture = TestBed.createComponent(<%= classify(name) %>AddModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call add<%= classify(name) %> event on submit', () => {
    spyOn(facade, 'add<%= classify(name) %>');
    const <%= camelize(name) %> = {
      name: 'name'
    } as <%= classify(name) %>;
    fixture.detectChanges();
    component.onAdd(<%= camelize(name) %>);

    expect(facade.add<%= classify(name) %>).toHaveBeenCalledWith(<%= camelize(name) %>);
  });

  it('should close if <%= camelize(name) %> added', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.added$ = of(true);
    fixture.detectChanges();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    fixture.detectChanges();
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should unsubscribe subscription when destroyed', () => {
    fixture.detectChanges();
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
