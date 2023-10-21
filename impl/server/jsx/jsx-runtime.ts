function parseAttr(key: string, value: any) {
  // handle style attribute
  if (key === "style" && typeof value === "object") {
    const camelToKebab = (str: string) =>
      str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    return Object.entries(value)
      .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
      .join(" ");
  }

  // handle web-component attribute
  if (key === "hot-web-element" && typeof value === "object") {
    const attributeify = (value: any) => {
      return Object.entries(value)
        .map(([key, value]) => `${key}=${value}`)
        .join(",");
    };

    return Object.entries(value)
      .map(([key, value]) => `${key}:${attributeify(value)}`)
      .join(";");
  }

  return value;
}

export const jsx = (tag: any, props: any) => {
  if (typeof tag === "function") {
    return tag(props);
  }
  const attrs = Object.entries(props)
    .filter(([name]) => name !== "children")
    .map(([key, val], i) => {
      let str = "";
      if (i === 0) str += " ";

      str += `${key}="${parseAttr(key, val)}"`;
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
