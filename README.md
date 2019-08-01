# Angular Schematic for ngx-starter app

The schematics in this library will help your generate CRUD feature in my [ngx-starter](https://github.com/cedricduffournet/ngx-starter.git).

## Using Schematics

Run schematics from your console in project.

```bash
ng generate @cedricduff/schematics-ngx-starter:crud MyFeature
```

![Alt text](assets/schematics.gif?raw=true "@cedricduff/schematics:crud")

## Feature structure

```tree
    ├── ...
    ├── src/
    │   ├── app/
    │       ├── my-feature
    │           │── components
    │           │    │── my-feature-add
    │           │    │    │── my-feature-add.component.html
    │           │    │    │── my-feature-add.component.spec.ts
    │           │    │    │── my-feature-add.component.ts
    │           │    │── my-feature-delete
    │           │    │    │── my-feature-delete.component.html
    │           │    │    │── my-feature-delete.component.spec.ts
    │           │    │    │── my-feature-delete.component.ts
    │           │    │── my-feature-form
    │           │    │    │── my-feature-delete.component.html
    │           │    │    │── my-feature-delete.component.spec.ts
    │           │    │    │── my-feature-delete.component.ts
    │           │    │── my-feature-item
    │           │    │    │── my-feature-item.component.html
    │           │    │    │── my-feature-item.component.spec.ts
    │           │    │    │── my-feature-item.component.ts
    │           │    │── my-feature-items
    │           │    │    │── my-feature-items.component.html
    │           │    │    │── my-feature-items.component.spec.ts
    │           │    │    │── my-feature-items.component.ts
    │           │    │── my-feature-update
    │           │    │    │── my-feature-update.component.html
    │           │    │    │── my-feature-update.component.spec.ts
    │           │    │    │── my-feature-update.component.ts
    │           │    │── index.ts
    │           │── containers
    │           │    │── my-feature-add-modal
    │           │    │    │── my-feature-add-modal.component.html
    │           │    │    │── my-feature-add-modal.component.spec.ts
    │           │    │    │── my-feature-add-modal.component.ts
    │           │    │── my-feature-delete
    │           │    │    │── my-feature-delete-modal.component.html
    │           │    │    │── my-feature-delete-modal.component.spec.ts
    │           │    │    │── my-feature-delete-modal.component.ts
    │           │    │── my-feature-list-view
    │           │    │    │── my-feature-list-view.component.html
    │           │    │    │── my-feature-list-view.component.spec.ts
    │           │    │    │── my-feature-list-view.component.ts
    │           │    │── my-feature-items
    │           │    │    │── my-feature-update-modal.component.html
    │           │    │    │── my-feature-update-modal.component.spec.ts
    │           │    │    │── my-feature-update-modal.component.ts
    │           │    │── index.ts
    │           │── models
    │           │    │── my-feature.ts
    │           │── services
    │           │    │── my-feature.service.ts
    │           │    │── index.ts
    │           │── state
    │           │    │── actions
    │           │    │    │── index.ts
    │           │    │    │── my-feature-add-modal.actions.ts
    │           │    │    │── my-feature-api.actions.ts
    │           │    │    │── my-feature-delete-modal.actions.ts
    │           │    │    │── my-feature-list-view.actions.ts
    │           │    │    │── my-feature-update-modal.actions.ts
    │           │    │── effects
    │           │    │    │── index.ts
    │           │    │    │── my-feature.effects.spec.ts
    │           │    │    │── my-feature.effects.ts
    │           │    │── reducers
    │           │    │    │── index.spec.ts
    │           │    │    │── index.ts
    │           │    │    │── my-feature-collection.reducer.spec.ts
    │           │    │    │── my-feature-collection.reducer.ts
    │           │    │    │── my-feature-entities.reducer.spec.ts
    │           │    │    │── my-feature-entities.reducer.ts
    │           │    │── my-feature.facade.ts
    │           │    │── my-feature.facade.spec.ts
    │           │── my-feature.module.ts
    └── ...
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
