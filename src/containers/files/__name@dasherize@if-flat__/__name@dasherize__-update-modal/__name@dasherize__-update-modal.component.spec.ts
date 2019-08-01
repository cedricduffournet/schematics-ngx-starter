import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';

import {
  <%= classify(name) %>UpdateComponent,
  <%= classify(name) %>FormComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %>UpdateModalComponent } from '@app/<%= dasherize(name) %>/containers';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('Update<%= classify(name) %>ModalComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>UpdateModalComponent>;
  let component: <%= classify(name) %>UpdateModalComponent;
  let facade: <%= classify(name) %>Facade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        <%= classify(name) %>UpdateComponent,
        <%= classify(name) %>UpdateModalComponent,
        <%= classify(name) %>FormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ModalWrapperModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: <%= classify(name) %>Facade,
          useValue: {
            selected$: of({
              name: 'TestName'
            }),
            updated$: of(false),
            update<%= classify(name) %>: jest.fn()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>UpdateModalComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(<%= classify(name) %>Facade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call update<%= classify(name) %> event on submit', () => {
    spyOn(facade, 'update<%= classify(name) %>');
    const data = {
      id: 1,
      <%= camelize(name) %>: {
        name: 'name'
      } as <%= classify(name) %>
    };
    fixture.detectChanges();
    component.onUpdate(data);
    expect(facade.update<%= classify(name) %>).toHaveBeenCalledWith(data);
  });

  it('should close if <%= camelize(name) %> updated', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.updated$ = of(true);
    fixture.detectChanges();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
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
