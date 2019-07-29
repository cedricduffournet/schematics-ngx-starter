import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { <%= classify(name) %>DeleteComponent } from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %>DeleteModalComponent } from '@app/<%= dasherize(name) %>/containers';
import * as from<%= pluralize(classify(name)) %> from '@app/<%= dasherize(name) %>/state/reducers';
import { <%= classify(name) %>DeleteModalActions } from '@app/<%= dasherize(name) %>/state/actions';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('Delete<%= classify(name) %>ModalComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>DeleteModalComponent>;
  let component: <%= classify(name) %>DeleteModalComponent;
  let store: MockStore<from<%= pluralize(classify(name)) %>.State>;
  let deleted: MemoizedSelector<from<%= pluralize(classify(name)) %>.State, boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [<%= classify(name) %>DeleteComponent, <%= classify(name) %>DeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(<%= classify(name) %>DeleteModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    deleted = store.overrideSelector(
      from<%= pluralize(classify(name)) %>.get<%= classify(name) %>CollectionDeleted,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a delete<%= classify(name) %> event on submit', () => {
    const <%= camelize(name) %> = {
      id: 1,
      name: 'name'
    } as <%= classify(name) %>;
    const action = <%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>({ <%= camelize(name) %> });
    fixture.detectChanges();
    component.onDelete(<%= camelize(name) %>);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after <%= camelize(name) %> added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    deleted.setResult(true);
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
