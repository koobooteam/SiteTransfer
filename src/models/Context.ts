import { Page } from "puppeteer";
import { ElementResult } from "../steps/Mapping";

export interface Context {
  entryUrl: string;
  rootPath: string;
  pages: IPage[];
  elResults: ElementResult[];
}

export interface IPage {
  path: string;
  value: Page;
  name: string;
}
