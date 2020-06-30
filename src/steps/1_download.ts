import fs from "fs";
import path from "path";
import scrape from "website-scraper";
import { Context } from "../models/Context";

export default async function (ctx: Context) {
  ctx.rootPath = ensureSiteDir(ctx.entryUrl);

  await scrape({
    urls: [ctx.entryUrl],
    directory: ctx.rootPath,
    recursive: true,
    filenameGenerator: "bySiteStructure",
    urlFilter: function (u) {
      return u.indexOf(ctx.entryUrl) === 0;
    },
    subdirectories: [
      {
        directory: "img",
        extensions: [".jpg", ".png", ".svg", ".gif", ".jpeg"],
      },
      { directory: "js", extensions: [".js"] },
      { directory: "css", extensions: [".css"] },
      { directory: "fonts", extensions: [".ttf", ".woff", ".woff2", ".eot"] },
    ],
  });
}

function ensureSiteDir(url: string) {
  url = url.replace(/\W/g, "_");
  let sitePath = path.join(process.cwd(), "out", url);
  if (fs.existsSync(sitePath)) {
    fs.rmdirSync(sitePath, {
      recursive: true,
    });
  }

  return sitePath;
}
