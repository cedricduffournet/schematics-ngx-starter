import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import {
  <%= classify(name) %>UpdateComponent,
  <%= classify(name) %>FormComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %>UpdateModalComponent } from '@app/<%= dasherize(name) %>/containers';
import * as fromCivilities from '@app/<%= dasherize(name) %>/state/reducers';

import { <%= classify(name) %>UpdateModalActions } from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('Update<%= classify(name) %>ModalComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>UpdateModalComponent>;
  let component: <%= classify(name) %>UpdateModalComponent;
  let store: MockStore<fromCivilities.State>;
  let updated: MemoizedSelector<fromCivilities.State, boolean>;
  let <%= camelize(name) %>: MemoizedSelector<fromCivilities.State, <%= classify(name) %>>;
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
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>UpdateModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    updated = store.overrideSelector(
      fromCivilities.get<%= classify(name) %>EntitiesUpdated,
      false
    );
    <%= camelize(name) %> = store.overrideSelector(fromCivilities.getSelected<%= classify(name) %>, {
      id: 1,
      name: 'name'
    });
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a delete<%= classify(name) %> event on submit', () => {
    const data = {
      id: 1,
      <%= camelize(name) %>: {
        name: 'name'
      } as <%= classify(name) %>
    };
    const action = <%= classify(name) %>UpdateModalActions.update<%= classify(name) %>({ data });
    fixture.detectChanges();
    component.onUpdate(data);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after <%= camelize(name) %> added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    updated.setResult(true);
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
