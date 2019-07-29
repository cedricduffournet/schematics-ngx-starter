import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  selector: 'app-<%= dasherize(name) %>-items',
  templateUrl: './<%= dasherize(name) %>-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>ItemsComponent {
  @Input() <%= pluralize(camelize(name)) %>: <%= classify(name) %>[];
  @Input() authorization: Authorization;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  @Output() add = new EventEmitter<string>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onUpdate(id: number) {
    this.update.emit(id);
  }

  onAdd() {
    this.add.emit('add');
  }

  trackById(index: number, item: <%= classify(name) %>) {
    return item.id;
  }
}
