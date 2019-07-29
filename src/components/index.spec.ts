import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';

import * as path from 'path';
import { Schema as ComponentOptions } from './schema';

describe('Components Schematic', () => {
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

  const defaultOptions: ComponentOptions = {
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

  it('should create component files', async () => {
    const options = { ...defaultOptions };

    const tree = await runner
      .runSchematicAsync('components', options, appTree)
      .toPromise();
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-add/foo-add.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-add/foo-add.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-add/foo-add.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-delete/foo-delete.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-delete/foo-delete.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-delete/foo-delete.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-form/foo-form.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-form/foo-form.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-form/foo-form.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-item/foo-item.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-item/foo-item.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-item/foo-item.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-items/foo-items.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-items/foo-items.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-items/foo-items.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-update/foo-update.component.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-update/foo-update.component.spec.ts'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/foo-update/foo-update.component.html'
    );
    expect(tree.files).toContain(
      '/projects/bar/src/app/foo/components/index.ts'
    );
  });
});
