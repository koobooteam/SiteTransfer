const fs = require("fs");
const path = require("path");

const srcDir = path.join(process.cwd(), "src");
const binDir = path.join(process.cwd(), "bin");

const srcFiles = getFiles(srcDir, [".ts"]);
const binFiles = getFiles(binDir, [".js", ".map"]);

for (const item of binFiles) {
  const source = item.substr(0, item.lastIndexOf(".")) + ".ts";
  if (!srcFiles.includes(source)) fs.unlinkSync(item);
}

function getFiles(dir, extensions) {
  let files = [];
  let entries = fs.readdirSync(dir);

  for (const entiry of entries) {
    const entiryPath = path.join(dir, entiry);
    const stat = fs.statSync(entiryPath);
    if (stat.isFile()) {
      if (extensions && extensions.every((e) => !entiry.endsWith(e))) continue;
      files.push(entiryPath);
    }
    if (stat.isDirectory()) files.push(...getFiles(entiryPath, extensions));
  }

  return files;
}
