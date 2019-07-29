import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  <%= classify(name) %>UpdateModalComponent,
  <%= classify(name) %>AddModalComponent,
  <%= classify(name) %>DeleteModalComponent
} from '@app/<%= dasherize(name) %>/containers';
import { Observable, of } from 'rxjs';

import {
  <%= classify(name) %>ApiActions,
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>UpdateModalActions,
  <%= classify(name) %>AddModalActions,
  <%= classify(name) %>DeleteModalActions
} from '@app/<%= dasherize(name) %>/state/actions';

import { ToasterActions } from '@app/core/state/actions';

import { <%= classify(name) %>Service } from '@app/<%= dasherize(name) %>/services';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';

@Injectable()
export class <%= classify(name) %>Effects {
  public constructor(
    private actions$: Actions,
    private service: <%= classify(name) %>Service,
    private ts: TranslateService,
    private modalService: BsModalService
  ) {}
  load<%= pluralize(classify(name)) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        <%= classify(name) %>ListViewActions.load<%= pluralize(classify(name)) %>
      ),
      switchMap(() => {
        return this.service.load<%= pluralize(classify(name)) %>().pipe(
          map(<%= pluralize(camelize(name)) %> => {
            return <%= classify(name) %>ApiActions.load<%= classify(name) %>Success({ <%= pluralize(camelize(name)) %> });
          }),
          catchError(error =>
            of(
              <%= classify(name) %>ApiActions.load<%= classify(name) %>Failure({
                error: error.error
              })
            )
          )
        );
      })
    )
  );

  add<%= classify(name) %>Modal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(<%= classify(name) %>ListViewActions.showAdd<%= classify(name) %>Modal),
        tap(() => {
          this.modalService.show(<%= classify(name) %>AddModalComponent, CRUD_MODAL_CONFIG);
        })
      ),
    { dispatch: false }
  );

  add<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>AddModalActions.add<%= classify(name) %>),
      map(action => action.<%= camelize(name) %>),
      mergeMap(<%= camelize(name) %> =>
        this.service.add<%= classify(name) %>(<%= camelize(name) %>).pipe(
          map(result =>
            <%= classify(name) %>ApiActions.add<%= classify(name) %>Success({ <%= camelize(name) %>: result })
          ),
          catchError(error =>
            of(<%= classify(name) %>ApiActions.add<%= classify(name) %>Failure({ error: error.error }))
          )
        )
      )
    )
  );

  update<%= classify(name) %>Modal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(<%= classify(name) %>ListViewActions.showUpdate<%= classify(name) %>Modal),
        tap(() => {
          this.modalService.show(
            <%= classify(name) %>UpdateModalComponent,
            CRUD_MODAL_CONFIG
          );
        })
      ),
    { dispatch: false }
  );

  update<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>UpdateModalActions.update<%= classify(name) %>),
      map(action => action.data),
      mergeMap(data =>
        this.service.update<%= classify(name) %>(data).pipe(
          map(result =>
            <%= classify(name) %>ApiActions.update<%= classify(name) %>Success({ <%= camelize(name) %>: result })
          ),
          catchError(error =>
            of(
              <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  delete<%= classify(name) %>Modal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(<%= classify(name) %>ListViewActions.showDelete<%= classify(name) %>Modal),
        tap(() => {
          this.modalService.show(
            <%= classify(name) %>DeleteModalComponent,
            CRUD_MODAL_CONFIG
          );
        })
      ),
    { dispatch: false }
  );

  delete<%= classify(name) %>$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>DeleteModalActions.delete<%= classify(name) %>),
      map(action => action.<%= camelize(name) %>),
      mergeMap(<%= camelize(name) %> =>
        this.service.delete<%= classify(name) %>(<%= camelize(name) %>).pipe(
          map(() =>
            <%= classify(name) %>ApiActions.delete<%= classify(name) %>Success({
              id: <%= camelize(name) %>.id
            })
          ),
          catchError(error =>
            of(
              <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  /************
   * Toater
   ************/

  addSuccess<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>ApiActions.add<%= classify(name) %>Success),
      map(() => {
        return ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('<%= underscore(name).toUpperCase() %>_ADD_SUCCESS'),
            body: ''
          }
        });
      })
    )
  );

  updateSuccess<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>ApiActions.update<%= classify(name) %>Success),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('<%= underscore(name).toUpperCase() %>_UPDATE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  deleteSuccess<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>ApiActions.delete<%= classify(name) %>Success),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('<%= underscore(name).toUpperCase() %>_DELETE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  fail<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        <%= classify(name) %>ApiActions.load<%= classify(name) %>Failure,
        <%= classify(name) %>ApiActions.update<%= classify(name) %>Failure,
        <%= classify(name) %>ApiActions.add<%= classify(name) %>Failure,
        <%= classify(name) %>ApiActions.delete<%= classify(name) %>Failure
      ),
      map(action => action.error),
      map(error =>
        ToasterActions.pop({
          params: {
            type: 'error',
            title: error.message,
            body: ''
          }
        })
      )
    )
  );
}
