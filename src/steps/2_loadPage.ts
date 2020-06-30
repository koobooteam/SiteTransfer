import { Context, IPage } from "../models/Context";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export default async function (ctx: Context) {
  ctx.pages = await loadPages(ctx.rootPath);
}

async function loadPages(rootPath: string) {
  let paths = fs
    .readdirSync(rootPath)
    .filter((f) => f.endsWith(".html"))
    .map((m) => path.join(rootPath, m));

  let pages: IPage[] = [];
  let browser = await puppeteer.launch();

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
