import * as <%= classify(name) %>UpdateModalActions from './<%= dasherize(name) %>-update-modal.actions';
import * as <%= classify(name) %>AddModalActions from './<%= dasherize(name) %>-add-modal.actions';
import * as <%= classify(name) %>DeleteModalActions from './<%= dasherize(name) %>-delete-modal.actions';
import * as <%= classify(name) %>ListViewActions from './<%= dasherize(name) %>-list-view.actions';
import * as <%= classify(name) %>ApiActions from './<%= dasherize(name) %>-api.actions';

export {
  <%= classify(name) %>ListViewActions,
  <%= classify(name) %>ApiActions,
  <%= classify(name) %>UpdateModalActions,
  <%= classify(name) %>AddModalActions,
  <%= classify(name) %>DeleteModalActions
};
