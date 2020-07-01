import { Context, IPage } from "../models/Context";
import path from "path";
import puppeteer from "puppeteer";
import { getFiles } from "../utils/io";

export default async function (ctx: Context) {
  ctx.pages = await loadPages(ctx.rootPath);
}

async function loadPages(rootPath: string) {
  let paths = getFiles(rootPath, [".html"]);
  let pages: IPage[] = [];
  let browser = await puppeteer.launch({ headless: false });

  for (const i of paths) {
    let page = await browser.newPage();
    await page.goto("file://" + i);
    await page.setViewport({ width: 1920, height: 1080 });
    pages.push({
      path: i,
      name: path.basename(i),
      value: page,
    });
  }

  return pages;
}
