import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { <%= classify(name) %>AddModalComponent } from '@app/<%= dasherize(name) %>/containers';
import { <%= classify(name) %>AddModalActions } from '@app/<%= dasherize(name) %>/state/actions';
import {
  <%= classify(name) %>AddComponent,
  <%= classify(name) %>FormComponent
} from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import * as fromCivilities from '@app/<%= dasherize(name) %>/state/reducers';

describe('<%= classify(name) %>AddModalComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>AddModalComponent>;
  let component: <%= classify(name) %>AddModalComponent;
  let store: MockStore<fromCivilities.State>;
  let added: MemoizedSelector<fromCivilities.State, boolean>;
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
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>AddModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    added = store.overrideSelector(
      fromCivilities.get<%= classify(name) %>CollectionAdded,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a add<%= classify(name) %> event on submit', () => {
    const <%= camelize(name) %> = {
      name: 'name'
    } as <%= classify(name) %>;
    const action = <%= classify(name) %>AddModalActions.add<%= classify(name) %>({ <%= camelize(name) %> });
    fixture.detectChanges();
    component.onAdd(<%= camelize(name) %>);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after <%= camelize(name) %> added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    added.setResult(true);
    // need this to trigger state change (see : https://github.com/ngrx/platform/issues/2000)
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
