import { URL } from "url";

export function splitUrl(baseurl: string, url: string) {
    let pasedUrl = new URL(url,baseurl)
    let paths = pasedUrl.pathname.split("/");
    let name = paths.pop();
}
