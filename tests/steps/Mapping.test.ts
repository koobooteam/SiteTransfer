import { Context, IPage } from "../../src/models/Context";
import path from "path";
import appsettings from "../../src/appsettings";
import { execSync } from "child_process";
import loadPage from "../../src/steps/2_loadPage"
import { JSDOM } from "jsdom"
import { assert } from "console";
import chrome from "puppeteer";
import 'expect-puppeteer'
import { ElementResult, UsefulStyle, GroupBy, GetElementResult, GetKoobooId, GetElementByKoobooId, ApplyElementResult } from "../../src/steps/Mapping"

import { rootCertificates } from "tls";
import { isContext } from "vm";

describe("loadPage", () => {
    beforeAll(() => {
        execSync("npm run build");
    });

    test("default", () => {
        appsettings.cwd = "D:\work\SiteTransfer\bin";

        let ctx = {
            entryUrl: "https://gpsites.co/dev/",
            rootPath: path.join(process.cwd(), "out", "https___gpsites_co_dev_"),
        } as Context;

        loadPage(ctx);
    });


    test("CalculateSimilarScore", () => {

        var one = "<div id='11'>test</div>";

        var el = new JSDOM(one);

        var find = el.window.document.getElementById("11")!;

        var result = find.innerHTML;

        expect(result).toBe("test");

    });



    test("GetElementResult", async () => {

        var browser = await chrome.launch();

        var page = await browser.newPage();

        await page.evaluate(() => {
            document.body.innerHTML = "<body class='abcclass'><div id='11'>test</div></body>";
        });

        var docresult = await page.evaluate(GetElementResult);

        expect(docresult.Children.length).toBe(2);
        var header = docresult.Children[0].tagName;
        var bodyer = docresult.Children[1].tagName;
        var diver = docresult.Children[1].Children[0].tagName;

        expect(header).toBe("HEAD");
        expect(bodyer).toBe("BODY");
        expect(diver).toBe("DIV");
    });


    test("getKoobooId", async () => {

        var browser = await chrome.launch();

        var page = await browser.newPage();

        var aaaa = await page.evaluate(() => {
            document.body.innerHTML = "<body><div>extra<div id='aa'>test</div></div></body>";

        });

        var test = await page.$("#aa");

        var id = await page.evaluate(GetKoobooId, await page.$("#aa"));

        expect(id).toContain("1-0-1");

        var result = await page.evaluate(GetElementByKoobooId, id);

        expect(result.id).toBe("aa");

    });



    test("applyResult", async () => {

        var browser = await chrome.launch();
        var page = await browser.newPage();
        var aaaa = await page.evaluate(() => {
          
            document.body.innerHTML = "<body><div>extra<div id='aa'>test</div></div></body>";

        });

        var ctx = {} as Context
        ctx.pages = [];
        var obj = {} as IPage;
        obj.value = page;
        ctx.pages.push(obj);

        await ApplyElementResult(ctx);

        expect(ctx.elResults.length).toBe(1);

        var div = ctx.elResults[0].Children[1].Children[0].Children[0];

        expect(div.id).toBe("aa");

    });


    test("groupby", async () => {
        jest.setTimeout(2000000)
        var browser = await chrome.launch({headless: false,devtools:true});
        var pageone = await browser.newPage();

        await pageone.evaluate(() => {
            document.body.innerHTML = "<body><div><div id=a><p>TEST<p></div></div></body>";
        });

        var pagetwo = await browser.newPage();
        await pagetwo.evaluate(() => {
            document.body.innerHTML = "<body><div><div id=b>NEXT</div></div></body>";
        });

        var ctx = {} as Context
        ctx.pages = [];

        var obj = {} as IPage;
        obj.value = pageone;
        obj.path = "/one"
        ctx.pages.push(obj);


        var obj2 = {} as IPage;
        obj2.value = pageone;
        obj2.path = "/two"
        ctx.pages.push(obj2);

        var result = await GroupBy(ctx);

        expect(result.children.length).toBe(2);  

    });

});