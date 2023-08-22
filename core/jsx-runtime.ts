export const jsx = (tag: any, props: any) => {
  const attrs = Object.entries(props)
    .filter(([name]) => name !== "children" && !name.startsWith("hot-"))
    .map(([name, value], i) => `${i === 0 ? " " : ""}${name}="${value}"`)
    .join(` `);

  const children = Array.isArray(props.children)
    ? props.children.join("")
    : props.children;
  return `<${tag}${attrs}>${children ? children : ""}</${tag}>`;
};

export const jsxDEV = jsx;

export const DOMcreateFragment = (props: any) => {
  return props.children;
};
