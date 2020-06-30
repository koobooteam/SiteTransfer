function getAll(urls: string[]) {
  let result = [];
  let promises = [];
  for (const i of urls) {
    let primise = fetch(i).then(rsp=>{
        rsp.text()
    });
    promises.push(primise);
  }
}
