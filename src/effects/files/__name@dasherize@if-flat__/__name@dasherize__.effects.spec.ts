import { TestBed } from '@angular/core/testing';

import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { <%= classify(name) %>Effects } from '@app/<%= dasherize(name) %>/state/effects';
import { <%= classify(name) %>Service } from '@app/<%= dasherize(name) %>/services';

import {
  <%= classify(name) %>AddModalActions,
  <%= classify(name) %>UpdateModalActions,
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>ApiActions,
  <%= classify(name) %>DeleteModalActions
} from '@app/<%= dasherize(name) %>/state/actions';
import { ToasterActions } from '@app/core/state/actions';

import {
  <%= classify(name) %>UpdateModalComponent,
  <%= classify(name) %>AddModalComponent,
  <%= classify(name) %>DeleteModalComponent
} from '@app/<%= dasherize(name) %>/containers';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';
import { BsModalService } from 'ngx-bootstrap/modal';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

describe('<%= classify(name) %>Effects', () => {
  let effects: <%= classify(name) %>Effects;
  let actions$: Observable<any>;
  let ts: TranslateService;
  let service: any;
  let modal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        <%= classify(name) %>Effects,
        provideMockActions(() => actions$),
        {
          provide: <%= classify(name) %>Service,
          useValue: {
            load<%= pluralize(classify(name)) %>: jest.fn(),
            add<%= classify(name) %>: jest.fn(),
            update<%= classify(name) %>: jest.fn(),
            delete<%= classify(name) %>: jest.fn()
          }
        },
        {
          provide: TranslateService,
          useValue: { instant: jest.fn() }
        },
        {
          provide: BsModalService,
          useValue: { show: jest.fn() }
        },
        provideMockStore()
      ]
    });
    effects = TestBed.get(<%= classify(name) %>Effects);
    service = TestBed.get(<%= classify(name) %>Service);
    ts = TestBed.get(TranslateService);
    modal = TestBed.get(BsModalService);
    actions$ = TestBed.get(Actions);
    spyOn(modal, 'show').and.callThrough();
  });

  describe('load<%= pluralize(classify(name)) %>$', () => {
    const <%= pluralize(camelize(name)) %> = {
      entities: {
        1: {
          name: 'Name 1'
        },
        2: {
          name: 'Name 2'
        }
      },
      result: [1, 2]
    };

    function load<%= classify(name) %>Success(
      action:
        | typeof <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>
    ) {
      const createAction = action();
      const success = <%= classify(name) %>ApiActions.load<%= classify(name) %>Success({
        <%= pluralize(camelize(name)) %>
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-a|', { a: <%= pluralize(camelize(name)) %> });
      const expected = cold('--b', { b: success });
      service.load<%= pluralize(classify(name)) %> = jest.fn(() => response);

      expect(effects.load<%= pluralize(classify(name)) %>$).toBeObservable(expected);
    }

    function load<%= classify(name) %>Failure(
      action:
        | typeof <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>
    ) {
      const createAction = action();
      const fail = <%= classify(name) %>ApiActions.load<%= classify(name) %>Failure({
        error: 'Error loading'
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-#|', {}, { error: 'Error loading' });
      const expected = cold('--b', { b: fail });
      service.load<%= pluralize(classify(name)) %> = jest.fn(() => response);

      expect(effects.load<%= pluralize(classify(name)) %>$).toBeObservable(expected);
    }

    it('should return a load<%= classify(name) %>Success, when <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>, with <%= pluralize(camelize(name)) %>, on success', () => {
      const action = <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>;
      load<%= classify(name) %>Success(action);
    });


    it('should return a load<%= classify(name) %>Failure, when <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %> on error', () => {
      const action = <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>;
      load<%= classify(name) %>Failure(action);
    });

  });

  describe('add<%= classify(name) %>Modal$', () => {
    it('should open a modal with Add<%= classify(name) %>ModalComponent component', (done: any) => {
      const action = <%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal();

      actions$ = of(action);

      effects.add<%= classify(name) %>Modal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          <%= classify(name) %>AddModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('add<%= classify(name) %>$', () => {
    const <%= camelize(name) %> = {
      name: 'Name'
    } as <%= classify(name) %>;

    it('should return a add<%= classify(name) %>Success with added <%= camelize(name) %> on success', () => {
      const <%= camelize(name) %>Success = {
        entities: {
          1: {
            id: 1,
            name: 'Name'
          }
        },
        result: 1
      };

      const action = <%= classify(name) %>AddModalActions.add<%= classify(name) %>({ <%= camelize(name) %> });
      const success = <%= classify(name) %>ApiActions.add<%= classify(name) %>Success({
        <%= camelize(name) %>: <%= camelize(name) %>Success
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: <%= camelize(name) %>Success });
      const expected = cold('--b', { b: success });
      service.add<%= classify(name) %> = jest.fn(() => response);

      expect(effects.add<%= classify(name) %>$).toBeObservable(expected);
    });

    it('should return a add<%= classify(name) %>Failure on error', () => {
      const action = <%= classify(name) %>AddModalActions.add<%= classify(name) %>({ <%= camelize(name) %> });
      const fail = <%= classify(name) %>ApiActions.add<%= classify(name) %>Failure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.add<%= classify(name) %> = jest.fn(() => response);

      expect(effects.add<%= classify(name) %>$).toBeObservable(expected);
    });
  });

  describe('addSuccess<%= classify(name) %>', () => {
    it('should return an ToasterActions.pop when <%= camelize(name) %> added success', () => {
      const <%= camelize(name) %>Success = {
        entities: {
          1: {
            name: 'Name'
          }
        },
        result: 1
      };
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };
      const action = <%= classify(name) %>ApiActions.add<%= classify(name) %>Success({
        <%= camelize(name) %>: <%= camelize(name) %>Success
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.addSuccess<%= classify(name) %>$).toBeObservable(expected);
    });
  });

  describe('update<%= classify(name) %>Modal$', () => {
    it('should open a modal with Update<%= classify(name) %>ModalComponent component', (done: any) => {
      const action = <%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal();

      actions$ = of(action);

      effects.update<%= classify(name) %>Modal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          <%= classify(name) %>UpdateModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('update<%= classify(name) %>$', () => {
    const <%= camelize(name) %> = {
      name: 'NameUpdated'
    } as <%= classify(name) %>;

    const id = 1;

    it('should return a update<%= classify(name) %>Success with updated <%= camelize(name) %> on success', () => {
      const <%= camelize(name) %>Success = {
        entities: {
          1: {
            name: 'Name'
          }
        },
        result: 1
      };

      const action = <%= classify(name) %>UpdateModalActions.update<%= classify(name) %>({
        data: { id, <%= camelize(name) %> }
      });
      const success = <%= classify(name) %>ApiActions.update<%= classify(name) %>Success({
        <%= camelize(name) %>: <%= camelize(name) %>Success
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: <%= camelize(name) %>Success });
      const expected = cold('--b', { b: success });
      service.update<%= classify(name) %> = jest.fn(() => response);

      expect(effects.update<%= classify(name) %>$).toBeObservable(expected);
    });

    it('should return a add<%= classify(name) %>Failure on error', () => {
      const action = <%= classify(name) %>UpdateModalActions.update<%= classify(name) %>({
        data: { id, <%= camelize(name) %> }
      });
      const fail = <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.update<%= classify(name) %> = jest.fn(() => response);

      expect(effects.update<%= classify(name) %>$).toBeObservable(expected);
    });
  });

  describe('updateSuccess<%= classify(name) %>', () => {
    it('should return an ToasterActions.pop when <%= camelize(name) %> update success', () => {
      const <%= camelize(name) %>Success = {
        entities: {
          1: {
            name: 'Name'
          }
        },
        result: 1
      };
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };
      const action = <%= classify(name) %>ApiActions.update<%= classify(name) %>Success({
        <%= camelize(name) %>: <%= camelize(name) %>Success
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.updateSuccess<%= classify(name) %>$).toBeObservable(expected);
    });
  });

  describe('delete<%= classify(name) %>Modal$', () => {
    it('should open a modal with Delete<%= classify(name) %>ModalComponent component', (done: any) => {
      const action = <%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal();

      actions$ = of(action);

      effects.delete<%= classify(name) %>Modal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          <%= classify(name) %>DeleteModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('delete<%= classify(name) %>$', () => {
    const <%= camelize(name) %> = {
      id: 1,
      name: 'Name'
    };

    it('should return a delete<%= classify(name) %>Success with delete <%= camelize(name) %> id on success', () => {
      const idSuccess = { id: 1 };
      const action = <%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>({ <%= camelize(name) %> });
      const success = <%= classify(name) %>ApiActions.delete<%= classify(name) %>Success(idSuccess);

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: idSuccess });
      const expected = cold('--b', { b: success });
      service.delete<%= classify(name) %> = jest.fn(() => response);

      expect(effects.delete<%= classify(name) %>$).toBeObservable(expected);
    });

    it('should return a delete<%= classify(name) %>Failure on error', () => {
      const action = <%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>({ <%= camelize(name) %> });
      const fail = <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.delete<%= classify(name) %> = jest.fn(() => response);

      expect(effects.delete<%= classify(name) %>$).toBeObservable(expected);
    });
  });

  describe('deleteSuccess<%= classify(name) %>', () => {
    it('should return an ToasterActions.pop when <%= camelize(name) %> delete success', () => {
      const id = 1;
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };

      const action = <%= classify(name) %>ApiActions.delete<%= classify(name) %>Success({
        id
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.deleteSuccess<%= classify(name) %>$).toBeObservable(expected);
    });
  });

  describe('fail<%= classify(name) %>$', () => {
    function <%= camelize(name) %>Failure(
      action:
        | typeof <%= classify(name) %>ApiActions.load<%= classify(name) %>Failure
        | typeof <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure
        | typeof <%= classify(name) %>ApiActions.add<%= classify(name) %>Failure
        | typeof <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure
    ) {
      const toasterConfig = {
        type: 'error',
        title: 'error',
        body: ''
      };
      const createAction = action({ error: { message: 'error' } });
      actions$ = hot('a', { a: createAction });

      const pop = ToasterActions.pop({ params: toasterConfig });
      const expected = cold('b', { b: pop });

      expect(effects.fail<%= classify(name) %>$).toBeObservable(expected);
    }

    it('should return an ToasterActions.pop when <%= classify(name) %>ApiActions.load<%= classify(name) %>Failure', () => {
      const action = <%= classify(name) %>ApiActions.load<%= classify(name) %>Failure;
      <%= camelize(name) %>Failure(action);
    });

    it('should return an ToasterActions.pop when <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure', () => {
      const action = <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure;
      <%= camelize(name) %>Failure(action);
    });

    it('should return an ToasterActions.pop when <%= classify(name) %>ApiActions.add<%= classify(name) %>Failure', () => {
      const action = <%= classify(name) %>ApiActions.add<%= classify(name) %>Failure;
      <%= camelize(name) %>Failure(action);
    });

    it('should return an ToasterActions.pop when <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure', () => {
      const action = <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure;
      <%= camelize(name) %>Failure(action);
    });
  });
});
