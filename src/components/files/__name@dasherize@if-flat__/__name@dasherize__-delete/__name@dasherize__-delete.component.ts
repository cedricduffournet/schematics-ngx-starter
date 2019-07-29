import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-delete',
  templateUrl: './<%= dasherize(name) %>-delete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>DeleteComponent {
  @Input() <%= camelize(name) %>: <%= classify(name) %>;
  @Input() deleting = false;
  @Output() delete = new EventEmitter<<%= classify(name) %>>();
  @Output() cancel = new EventEmitter<string>();

  onDelete(<%= camelize(name) %>: <%= classify(name) %>) {
    this.delete.emit(<%= camelize(name) %>);
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
