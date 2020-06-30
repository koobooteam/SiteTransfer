import fs from "fs";
import path from "path";

export function getFiles(dir: string, extensions: string[] | string): string[] {
  let files = [];
  let entries = fs.readdirSync(dir);

  for (const entiry of entries) {
    const entiryPath = path.join(dir, entiry);
    const stat = fs.statSync(entiryPath);

    if (stat.isFile()) {
      const notWithExtension =
        typeof extensions === "string" && !entiry.endsWith(extensions);

      const notWithExtensions =
        extensions instanceof Array &&
        extensions.every((e) => !entiry.endsWith(e));

      if (notWithExtension || notWithExtensions) continue;

      files.push(entiryPath);
    }

    if (stat.isDirectory()) files.push(...getFiles(entiryPath, extensions));
  }

  return files;
}
