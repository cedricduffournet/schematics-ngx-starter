import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';
import { normalize } from 'normalizr';

import { <%= classify(name) %>Service } from '@app/<%= dasherize(name) %>/services';
import { <%= camelize(name) %>Schema, <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { HttpService } from '@app/core/services/http.service';

describe('<%= classify(name) %>Service', () => {
  let service: <%= classify(name) %>Service;
  let http: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            getPublic: jest.fn(),
            put: jest.fn(),
            post: jest.fn(),
            delete: jest.fn()
          }
        },
        <%= classify(name) %>Service
      ]
    });

    service = TestBed.get(<%= classify(name) %>Service);
    http = TestBed.get(HttpService);
  });

  it('should retrieve <%= camelize(name) %> collection', () => {
    const <%= pluralize(camelize(name)) %> = [
      {
        id: 1,
        name: 'name 1'
      },
      {
        id: 1,
        name: 'name 2'
      }
    ];<% if(paginated) { %>

    const meta = {
    };

    const config = {
      page: 1,
      itemsPerPage: 10
    };<% } %>

    const <%= pluralize(camelize(name)) %>Normalized = normalize(<%= pluralize(camelize(name)) %>, [<%= camelize(name) %>Schema]);<% if(paginated) { %>
    const response = cold('-a|', { a:  { data: <%= pluralize(camelize(name)) %>, meta }});
    const expected = cold('-b|', { b: {<%= pluralize(camelize(name)) %>: <%= pluralize(camelize(name)) %>Normalized, meta }});
    const params = service.toHttpParams(config);<% } else { %>
    const response = cold('-a|', { a: <%= pluralize(camelize(name)) %> });
    const expected = cold('-b|', { b: <%= pluralize(camelize(name)) %>Normalized });<% } %>

    http.get = jest.fn(() => response);

    expect(service.load<%= pluralize(classify(name)) %>(<% if(paginated) { %>config<% } %>)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith('/<%= pluralize(name.toLowerCase()) %>'<% if(paginated) { %>, params<% } %>);
  });

  it('should update <%= camelize(name) %>, and return <%= camelize(name) %> updated', () => {
    const <%= camelize(name) %> = {
      name: 'name 1'
    } as <%= classify(name) %>;
    const id = 1;
    const data = {
      id,
      <%= camelize(name) %>: {
        name: <%= camelize(name) %>.name
      }
    };
    const <%= camelize(name) %>Normalized = normalize(
      { id, name: <%= camelize(name) %>.name },
      <%= camelize(name) %>Schema
    );

    const response = cold('-a|', {
      a: { id, name: <%= camelize(name) %>.name }
    });
    const expected = cold('-b|', { b: <%= camelize(name) %>Normalized });
    http.put = jest.fn(() => response);

    expect(service.update<%= classify(name) %>(data)).toBeObservable(expected);
    expect(http.put).toHaveBeenCalledWith(`/<%= pluralize(name.toLowerCase()) %>/${id}`, data.<%= camelize(name) %>);
  });

  it('should add <%= camelize(name) %>, and return <%= camelize(name) %> added', () => {
    const <%= camelize(name) %> = {
      name: 'name 1'
    } as <%= classify(name) %>;

    const <%= camelize(name) %>Normalized = normalize(<%= camelize(name) %>, <%= camelize(name) %>Schema);

    const response = cold('-a|', { a: <%= camelize(name) %> });
    const expected = cold('-b|', { b: <%= camelize(name) %>Normalized });
    http.post = jest.fn(() => response);

    expect(service.add<%= classify(name) %>(<%= camelize(name) %>)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(`/<%= pluralize(name.toLowerCase()) %>`, <%= camelize(name) %>);
  });

  it('should remove <%= camelize(name) %>, and return remove id', () => {
    const <%= camelize(name) %> = {
      id: 1,
      name: 'name 1'
    } as <%= classify(name) %>;

    const response = cold('-a|', { a: {} });
    const expected = cold('-b|', { b: <%= camelize(name) %>.id });
    http.delete = jest.fn(() => response);

    expect(service.delete<%= classify(name) %>(<%= camelize(name) %>)).toBeObservable(expected);
    expect(http.delete).toHaveBeenCalledWith(`/<%= pluralize(name.toLowerCase()) %>/${<%= camelize(name) %>.id}`);
  });
});
