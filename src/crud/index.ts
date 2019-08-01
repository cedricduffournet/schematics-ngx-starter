import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  schematic
} from '@angular-devkit/schematics';

import { Schema as CrudOptions } from './schema';

export default function(options: CrudOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const rule = chain([
      schematic('actions', options),
      schematic('components', options),
      schematic('containers', options),
      schematic('effects', options),
      schematic('models', options),
      schematic('module', options),
      schematic('reducers', options),
      schematic('services', options),
      schematic('facade', options)
    ]);
    return rule(host, context);
  };
}
