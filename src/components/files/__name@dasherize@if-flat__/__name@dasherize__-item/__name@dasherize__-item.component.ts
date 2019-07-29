import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app<%= classify(name) %>Item]',
  templateUrl: './<%= dasherize(name) %>-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>ItemComponent {
  @Input() <%= camelize(name) %>: <%= classify(name) %>;
  @Input() authorization: Authorization;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onUpdate(id: number) {
    this.update.emit(id);
  }
}
