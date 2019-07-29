import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';

import * as path from 'path';
import { Schema as EffectOptions } from './schema';

describe('Effects Schematic', () => {
  const workspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0',
    defaultProject: 'bar'
  };

  const appOptions = {
    name: 'bar',
    inlineStyle: false,
    inlineTemplate: false,
    viewEncapsulation: 'Emulated',
    routing: false,
    style: 'css',
    skipTests: false
  };

  let appTree: UnitTestTree;

  const runner = new SchematicTestRunner(
    '@ngx-demo/schematics',
    path.join(__dirname, '../collection.json')
  );

  const defaultOptions: EffectOptions = {
    name: 'foo',
    project: 'bar',
    flat: false
  };

  beforeEach(async () => {
    appTree = await runner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();

    appTree = await runner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
  });

  it('should create effect files', async () => {
    const options = { ...defaultOptions };

    const tree = await runner
      .runSchematicAsync('effects', options, appTree)
      .toPromise();
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/effects/foo.effects.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/effects/foo.effects.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/effects/index.ts'
    );
  });
});
