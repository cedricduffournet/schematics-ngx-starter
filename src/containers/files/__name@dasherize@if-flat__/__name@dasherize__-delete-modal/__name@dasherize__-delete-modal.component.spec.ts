import { TestBed, ComponentFixture } from '@angular/core/testing';

import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { <%= classify(name) %>DeleteComponent } from '@app/<%= dasherize(name) %>/components';
import { <%= classify(name) %>DeleteModalComponent } from '@app/<%= dasherize(name) %>/containers';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';

describe('Delete<%= classify(name) %>ModalComponent', () => {
  let fixture: ComponentFixture<<%= classify(name) %>DeleteModalComponent>;
  let component: <%= classify(name) %>DeleteModalComponent;
  let facade: <%= classify(name) %>Facade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [<%= classify(name) %>DeleteComponent, <%= classify(name) %>DeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: <%= classify(name) %>Facade,
          useValue: {
            deleted$: of(false),
            delete<%= classify(name) %>: jest.fn()
          }
        }
      ]
    });

    facade = TestBed.get(<%= classify(name) %>Facade);
    fixture = TestBed.createComponent(<%= classify(name) %>DeleteModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call delete<%= classify(name) %> event on submit', () => {
    const <%= camelize(name) %> = {
      id: 1,
      name: 'name'
    } as <%= classify(name) %>;
    fixture.detectChanges();
    component.onDelete(<%= camelize(name) %>);

    expect(facade.delete<%= classify(name) %>).toHaveBeenCalledWith(<%= camelize(name) %>);
  });

  it('should close if <%= camelize(name) %> deleted', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.deleted$ = of(true);
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
