import { Tree } from "@angular-devkit/schematics";
import { getWorkspace } from "@schematics/angular/utility/config";
import {
  buildDefaultPath,
  getProject
} from "@schematics/angular/utility/project";

export function getProjectPath(
  host: Tree,
  options: { project?: string | undefined; path?: string | undefined }
) {
  const workspace = getWorkspace(host);
  const projectName = options.project || Object.keys(workspace.projects)[0];
  const project = getProject(host, projectName);

  if (options.path === undefined) {
    options.path = buildDefaultPath(project);
  }

  return options.path;
}
