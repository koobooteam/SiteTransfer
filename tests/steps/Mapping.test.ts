import { Context } from "../../src/models/Context";
import path from "path";
import appsettings from "../../src/appsettings";
import { execSync } from "child_process";
import loadPage from "../../src/steps/2_loadPage"
import jsdom from "jsdom"
import { assert } from "console";
import chrome from "puppeteer";
import { ElementResult, UsefulStyle, GetElementResult, GetKoobooId, GetElementByKoobooId } from "../../src/steps/Mapping"

import { rootCertificates } from "tls";

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
        var two = "<div>testtwo</div>";

        var el = new jsdom.JSDOM(one);

        var find = el.window.document.getElementById("11")!;

        var result = find.innerHTML;

        expect(result).toBe("test");

    });



    test("ApplyElementResult", async () => {

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

        var aaaa =  await page.evaluate(() => {
            document.body.innerHTML = "<body><div>extra<div id='aa'>test</div></div></body>"; 

        });

        var test = await page.$("#aa");

        var id = await page.evaluate(GetKoobooId, await page.$("#aa"));

        expect(id).toContain("1-1");

    });

});