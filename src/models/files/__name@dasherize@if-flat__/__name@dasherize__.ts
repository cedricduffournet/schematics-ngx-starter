import { schema } from 'normalizr';

export interface <%= classify(name) %> {
  id: number;
  name: string;
}

export const <%= camelize(name) %>Schema = new schema.Entity('<%= pluralize(camelize(name)) %>');
