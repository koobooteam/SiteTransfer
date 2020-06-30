import { Page } from "puppeteer";

export interface Context {
  entryUrl: string;
  rootPath: string;
  pages: IPage[];
}

export interface IPage {
  path: string;
  value: Page;
  name: string;
}
