import { Context, IPage } from "../models/Context";
import appsettings from "../../src/appsettings";
import puppeteer, { Page } from "puppeteer";
import { listenerCount } from "process";
import { appendFile, readdirSync } from "fs";
import { countReset } from "console";
import { generateKeyPair } from "crypto";
 
export async function ExtraContentLayout(context: Context) { 
    // Get the list of pages without home...
  
}