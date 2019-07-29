import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';

import * as path from 'path';
import { Schema as ContainerOptions } from './schema';

describe('Containers Schematic', () => {
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

  const defaultOptions: ContainerOptions = {
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

  it('should create containers files', async () => {
    const options = { ...defaultOptions };

    const tree = await runner
      .runSchematicAsync('containers', options, appTree)
      .toPromise();
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-add-modal/foo-add-modal.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-add-modal/foo-add-modal.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-add-modal/foo-add-modal.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-delete-modal/foo-delete-modal.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-delete-modal/foo-delete-modal.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-delete-modal/foo-delete-modal.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-list-view/foo-list-view.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-list-view/foo-list-view.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-list-view/foo-list-view.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-update-modal/foo-update-modal.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-update-modal/foo-update-modal.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/foo-update-modal/foo-update-modal.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/containers/index.ts'
    );
  });
});
