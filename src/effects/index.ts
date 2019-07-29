import {
  Rule,
  SchematicContext,
  Tree,
  url,
  template,
  apply,
  mergeWith,
  move
} from '@angular-devkit/schematics';

import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';

import { Schema as EffectOptions } from './schema';
import { getProjectPath, stringUtils } from '../core';

export default function(options: EffectOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    options.path = getProjectPath(host, options);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ...strings,
        ...stringUtils,
        'if-flat': (s: string) => (options.flat ? '' : s + '/state/effects'),
        ...options
      }),
      move(parsedPath.path)
    ]);
    return mergeWith(sourceParametrizedTemplates)(host, context);
  };
}
