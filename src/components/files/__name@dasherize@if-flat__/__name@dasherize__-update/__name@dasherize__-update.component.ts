import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  OnDestroy,
  Input
} from '@angular/core';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-update',
  templateUrl: './<%= dasherize(name) %>-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>UpdateComponent {
  @Input() <%= camelize(name) %>: <%= classify(name) %>;
  @Input() updating = false;
  @Output() update = new EventEmitter<{
    id: number;
    <%= camelize(name) %>: <%= classify(name) %>;
  }>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(<%= camelize(name) %>: <%= classify(name) %>) {
    const id = this.<%= camelize(name) %>.id;
    this.update.emit({
      id,
      <%= camelize(name) %>
    });
  }
}
