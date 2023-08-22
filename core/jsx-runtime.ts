export const jsx = (tag: any, props: any) => {
  const attrs = Object.entries(props)
    .filter(([name]) => name !== "children" && !name.startsWith("hot-"))
    .map(([name, value], i) => `${i === 0 ? " " : ""}${name}="${value}"`)
    .join(` `);

  const hotAttrs = Object.entries(props)
    .filter(([name]) => name.startsWith("hot-"))
    .reduce((acc, [name, value]) => {
      acc.push([name.replace("hot-", ""), value]);
      return acc;
    }, [] as any);

  const hotAttrsString =
    hotAttrs.length > 0 ? ` hot-x='${JSON.stringify(hotAttrs)}'` : "";

  const children = Array.isArray(props.children)
    ? props.children.join("")
    : props.children;
  return `<${tag}${attrs}${hotAttrsString}>${
    children ? children : ""
  }</${tag}>`;
};

export const jsxDEV = jsx;

export const DOMcreateFragment = (props: any) => {
  return props.children;
};
