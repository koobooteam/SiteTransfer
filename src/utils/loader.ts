import appsettings from "../appsettings";
import path from "path";
import { getFiles } from "./io";

export function loadRules<T>(paths: string[]): T[] {
  let rootPath = path.join(appsettings.cwd, ...paths);
  let rulePaths = getFiles(rootPath, ".js");
  let rules = [];

  for (const item of rulePaths) {
    let module = require(item).default;
    if (module) rules.push(new module() as T);
  }

  return rules;
}
