export const jsx = (tag: any, props: any) => {
  const attrs = Object.entries(props)
    .filter(([name]) => name !== "children")
    .map(([name, value], i) => {
      let str = "";
      if (i === 0) str += " ";
      const val =
        typeof value === "string" ? `"${value}"` : `'${JSON.stringify(value)}'`;
      str += `${name}=${val}`;
      return str;
    })
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
