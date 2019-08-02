import { Injectable } from '@angular/core';

import { normalize } from 'normalizr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { <%= classify(name) %>, <%= camelize(name) %>Schema } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { HttpService } from '@app/core/services/http.service';
import { NormalizedData } from '@app/shared/models/normalized.model';<% if(paginated) { %>
import { PaginatedResult } from '@app/shared/models/paginated-result';
import { HttpParams } from '@angular/common/http';<% } %>

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {
  private path = '/<%= pluralize(name.toLowerCase()) %>';

  public constructor(private httpService: HttpService) {}
<% if(paginated) { %>
  public load<%= pluralize(classify(name)) %>(
    config: any
  ): Observable<{ <%= pluralize(camelize(name)) %>: NormalizedData; meta: any }> {
    return this.httpService
      .get<PaginatedResult<<%= classify(name) %>>>(this.path, this.toHttpParams(config))
      .pipe(
        map(res => {
          return {
            <%= pluralize(camelize(name)) %>: normalize(res.data, [<%= camelize(name) %>Schema]),
            meta: res.meta
          };
        })
      );
  }
<% } else {%>
  public load<%= pluralize(classify(name)) %>(): Observable<NormalizedData> {
    return this.httpService
      .get<<%= classify(name) %>[]>(this.path)
      .pipe(map(res => normalize(res, [<%= camelize(name) %>Schema])));
  }
<% } %>
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
  }<% if(paginated) { %>

  public toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams()
    );
  }<% } %>
}
