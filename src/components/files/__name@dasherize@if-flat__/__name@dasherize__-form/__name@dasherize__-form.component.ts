import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { <%= classify(name) %> } from '@app/<%= dasherize(name) %>/models/<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-form',
  templateUrl: './<%= dasherize(name) %>-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= classify(name) %>FormComponent implements OnInit {
  @Input() <%= camelize(name) %> = {} as <%= classify(name) %>;
  @Input() processing = false;
  @Output() save = new EventEmitter<<%= classify(name) %>>();
  @Output() cancel = new EventEmitter();

  <%= camelize(name) %>Form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.<%= camelize(name) %>Form = this.formBuilder.group({
      name: [this.<%= camelize(name) %>.name, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.<%= camelize(name) %>Form.valid) {
      this.save.emit(this.<%= camelize(name) %>Form.value);
    }
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
