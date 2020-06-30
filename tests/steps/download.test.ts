import download from "../../src/steps/1_download";
import { Context } from "../../src/models/Context";

describe("download", () => {
  test("default", async () => {
    jest.setTimeout(100000);
    let ctx = { entryUrl: "https://gpsites.co/dev/" } as Context;
    await download(ctx);
  });
});
