import { Context } from "../../src/models/Context";
import path from "path";
import appsettings from "../../src/appsettings";
import { execSync } from "child_process";
import loadPage from "../../src/steps/2_loadPage"

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
});
