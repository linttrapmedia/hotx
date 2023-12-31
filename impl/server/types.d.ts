type HotAttrs =
  | "hot-data"
  | "hot-delete"
  | "hot-form"
  | "hot-get"
  | "hot-id"
  | "hot-patch"
  | "hot-post"
  | "hot-put"
  | "hot-trigger"
  | "hot:click"
  | "hot:submit";

namespace JSX {
  type Element = string | any;
  type HtmlAttr = {
    [key: string]: any;
    style?: Partial<CSSStyleDeclaration> | string;
  } & {
    [key in HotAttrs]?: string;
  };
  interface IntrinsicElements {
    "hot-drawer": HotDrawerAttributes;
    "hot-drawer-toggle": HotDrawerAttributes;
    "hot-button": HotButtonAttributes;
    a: HtmlAttr;
    abbr: HtmlAttr;
    address: HtmlAttr;
    area: HtmlAttr;
    article: HtmlAttr;
    aside: HtmlAttr;
    audio: HtmlAttr;
    b: HtmlAttr;
    base: HtmlAttr;
    bdi: HtmlAttr;
    bdo: HtmlAttr;
    blockquote: HtmlAttr;
    body: HtmlAttr;
    br: HtmlAttr;
    button: HtmlAttr;
    canvas: HtmlAttr;
    caption: HtmlAttr;
    cite: HtmlAttr;
    code: HtmlAttr;
    col: HtmlAttr;
    colgroup: HtmlAttr;
    data: HtmlAttr;
    datalist: HtmlAttr;
    dd: HtmlAttr;
    del: HtmlAttr;
    details: HtmlAttr;
    dfn: HtmlAttr;
    dialog: HtmlAttr;
    div: HtmlAttr;
    dl: HtmlAttr;
    dt: HtmlAttr;
    em: HtmlAttr;
    embed: HtmlAttr;
    fieldset: HtmlAttr;
    figcaption: HtmlAttr;
    figure: HtmlAttr;
    footer: HtmlAttr;
    form: HtmlAttr;
    h1: HtmlAttr;
    h2: HtmlAttr;
    h3: HtmlAttr;
    h4: HtmlAttr;
    h5: HtmlAttr;
    h6: HtmlAttr;
    head: HtmlAttr;
    header: HtmlAttr;
    hr: HtmlAttr;
    html: HtmlAttr;
    i: HtmlAttr;
    iframe: HtmlAttr;
    img: HtmlAttr;
    input: HtmlAttr;
    ins: HtmlAttr;
    kbd: HtmlAttr;
    label: HtmlAttr;
    legend: HtmlAttr;
    li: HtmlAttr;
    link: HtmlAttr;
    main: HtmlAttr;
    map: HtmlAttr;
    mark: HtmlAttr;
    meta: HtmlAttr;
    meter: HtmlAttr;
    nav: HtmlAttr;
    noscript: HtmlAttr;
    object: HtmlAttr;
    ol: HtmlAttr;
    optgroup: HtmlAttr;
    option: HtmlAttr;
    output: HtmlAttr;
    p: HtmlAttr;
    param: HtmlAttr;
    picture: HtmlAttr;
    pre: HtmlAttr;
    progress: HtmlAttr;
    q: HtmlAttr;
    rp: HtmlAttr;
    rt: HtmlAttr;
    ruby: HtmlAttr;
    s: HtmlAttr;
    samp: HtmlAttr;
    script: HtmlAttr;
    section: HtmlAttr;
    select: HtmlAttr;
    small: HtmlAttr;
    source: HtmlAttr;
    span: HtmlAttr;
    strong: HtmlAttr;
    style: HtmlAttr;
    sub: HtmlAttr;
    summary: HtmlAttr;
    sup: HtmlAttr;
    table: HtmlAttr;
    tbody: HtmlAttr;
    td: HtmlAttr;
    template: HtmlAttr;
    textarea: HtmlAttr;
    tfoot: HtmlAttr;
    th: HtmlAttr;
    thead: HtmlAttr;
    time: HtmlAttr;
    title: HtmlAttr;
    tr: HtmlAttr;
    track: HtmlAttr;
    u: HtmlAttr;
    ul: HtmlAttr;
    var: HtmlAttr;
    video: HtmlAttr;
    wbr: HtmlAttr;
  }
}
