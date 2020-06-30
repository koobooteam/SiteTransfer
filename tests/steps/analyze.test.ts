import analyze from "../../src/steps/3_analyze";
import { Context } from "../../src/models/Context";
import path from "path";
import appsettings from "../../src/appsettings";
import { execSync } from "child_process";
import save from "../../src/steps/4_save"

describe("analyze", () => {
  beforeAll(() => {
    execSync("npm run build");
  });

  test("default", () => {
    appsettings.cwd = "/Users/huanent/Downloads/wp_site_importer/bin";

    let ctx = {
      entryUrl: "https://gpsites.co/dev/",
      rootPath: path.join(process.cwd(), "out", "https___gpsites_co_dev_"),
    } as Context;

    analyze(ctx);
  });

  test("analyze_and_save", () => {
    appsettings.cwd = "/Users/huanent/Downloads/wp_site_importer/bin";

    let ctx = {
      entryUrl: "https://gpsites.co/dev/",
      rootPath: path.join(process.cwd(), "out", "https___gpsites_co_dev_"),
    } as Context;

    analyze(ctx);
    save(ctx);
  });
});
