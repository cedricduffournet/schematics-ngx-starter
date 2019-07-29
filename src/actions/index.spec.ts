import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';

import * as path from 'path';
import { Schema as ActionOptions } from './schema';

describe('Actions Schematic', () => {
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

  const defaultOptions: ActionOptions = {
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

  it('should create action files', async () => {
    const options = { ...defaultOptions };

    const tree = await runner
      .runSchematicAsync('actions', options, appTree)
      .toPromise();
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/actions/foo-add-modal.actions.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/actions/foo-delete-modal.actions.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/actions/foo-list-view.actions.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/actions/foo-update-modal.actions.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/state/actions/foo-api.actions.ts'
    );
  });
});
