import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { <%= classify(name) %>Effects } from '@app/<%= dasherize(name) %>/state/effects';
import { <%= classify(name) %>Facade } from '@app/<%= dasherize(name) %>/state/<%= dasherize(name) %>.facade';
import {
  <%= classify(name) %>AddComponent,
  <%= classify(name) %>UpdateComponent,
  <%= classify(name) %>DeleteComponent,
  <%= classify(name) %>FormComponent,
  <%= classify(name) %>ItemComponent,
  <%= classify(name) %>ItemsComponent
} from '@app/<%= dasherize(name) %>/components';
import {
  <%= classify(name) %>AddModalComponent,
  <%= classify(name) %>UpdateModalComponent,
  <%= classify(name) %>DeleteModalComponent,
  <%= classify(name) %>ListViewComponent
} from '@app/<%= dasherize(name) %>/containers';
import { reducers } from '@app/<%= dasherize(name) %>/state/reducers';
import { CoalescingComponentFactoryResolver } from '@app/coalescing-component-factory-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    EffectsModule.forFeature([<%= classify(name) %>Effects]),
    StoreModule.forFeature('<%= pluralize(camelize(name)) %>', reducers)
  ],
  declarations: [
    <%= classify(name) %>ListViewComponent,
    <%= classify(name) %>AddComponent,
    <%= classify(name) %>UpdateComponent,
    <%= classify(name) %>DeleteComponent,
    <%= classify(name) %>FormComponent,
    <%= classify(name) %>ItemComponent,
    <%= classify(name) %>ItemsComponent,
    <%= classify(name) %>AddModalComponent,
    <%= classify(name) %>UpdateModalComponent,
    <%= classify(name) %>DeleteModalComponent
  ],
  entryComponents: [
    <%= classify(name) %>UpdateModalComponent,
    <%= classify(name) %>AddModalComponent,
    <%= classify(name) %>DeleteModalComponent
  ],
  exports: [<%= classify(name) %>ListViewComponent],
  providers: [<%= classify(name) %>Facade]
})
export class <%= classify(name) %>Module {
  // see https://github.com/angular/angular/issues/14324
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
