export function getChildren(ele: Element) {
  const result = [];

  for (let i = 0; i < ele.children.length; i++) {
    let item = ele.children.item(i);
    if (item) result.push(item);
  }

  return result;
}

export function getAllElement(e: Element, includeSelf = false) {
  const result = includeSelf ? [e] : [];

  function inner(el: Element) {
    let children = getChildren(el);
    let list = [...children];

    for (const child of children) {
      if (child) list.push(...inner(child));
    }

    return list;
  }

  result.push(...inner(e));

  return result;
}

export function getClassList(ele: Element) {
  let result: string[] = [];
  ele.classList.forEach((f) => result.push(f));
  return result;
}
