import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  Input
} from '@angular/core';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-add',
  templateUrl: './<%= dasherize(name) %>-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>AddComponent {
  @Input() adding = false;
  @Output() add = new EventEmitter<<%= classify(name) %>>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(<%= camelize(name) %>: <%= classify(name) %>) {
    this.add.emit(<%= camelize(name) %>);
  }
}
