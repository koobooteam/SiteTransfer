import download from "./steps/1_download";
import appsettings from "./appsettings";
import { Context } from "./models/Context";
import loadPage from "./steps/2_loadPage";

(async function () {
  for (const site of appsettings.sites) {
    const ctx = { entryUrl: site } as Context;
    await download(ctx);
    await loadPage(ctx);

    var aa=ctx;
  }
})();
