import { Injectable } from '@angular/core';

import { normalize } from 'normalizr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { <%= classify(name) %>, <%= camelize(name) %>Schema } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { HttpService } from '@app/core/services/http.service';
import { NormalizedData } from '@app/shared/models/normalized.model';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {
  private path = '/<%= pluralize(name.toLowerCase()) %>';

  public constructor(private httpService: HttpService) {}
  public load<%= pluralize(classify(name)) %>(): Observable<NormalizedData> {
    return this.httpService
      .get<<%= classify(name) %>[]>(this.path)
      .pipe(map(res => normalize(res, [<%= camelize(name) %>Schema])));
  }

  public update<%= classify(name) %>(data: any): Observable<NormalizedData> {
    return this.httpService
      .put<<%= classify(name) %>>(`${this.path}/${data.id}`, data.<%= camelize(name) %>)
      .pipe(map(res => normalize(res, <%= camelize(name) %>Schema)));
  }

  public add<%= classify(name) %>(<%= camelize(name) %>: any): Observable<NormalizedData> {
    return this.httpService
      .post<<%= classify(name) %>>(this.path, <%= camelize(name) %>)
      .pipe(map(res => normalize(res, <%= camelize(name) %>Schema)));
  }

  public delete<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>): Observable<number | undefined> {
    return this.httpService
      .delete(`${this.path}/${<%= camelize(name) %>.id}`)
      .pipe(map(() => <%= camelize(name) %>.id));
  }
}
