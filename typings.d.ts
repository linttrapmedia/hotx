type HotTrait =
  | ["trigger", string]
  | ["request", string]
  | ["append", string]
  | ["prepend", string]
  | ["replace", string]
  | ["clear", string]
  | ["select", string, string];

type HotAttr = {
  "hot-x"?: HotTrait[];
  [key: string]: any;
};

type HotxRequest = any;

namespace JSX {
  type Element = string | any;
  interface IntrinsicElements {
    [key: string]: any;
    a: HotAttr;
    abbr: HotAttr;
    address: HotAttr;
    area: HotAttr;
    article: HotAttr;
    aside: HotAttr;
    audio: HotAttr;
    b: HotAttr;
    base: HotAttr;
    bdi: HotAttr;
    bdo: HotAttr;
    blockquote: HotAttr;
    body: HotAttr;
    br: HotAttr;
    button: HotAttr;
    canvas: HotAttr;
    caption: HotAttr;
    cite: HotAttr;
    code: HotAttr;
    col: HotAttr;
    colgroup: HotAttr;
    data: HotAttr;
    datalist: HotAttr;
    dd: HotAttr;
    del: HotAttr;
    details: HotAttr;
    dfn: HotAttr;
    dialog: HotAttr;
    div: HotAttr;
    dl: HotAttr;
    dt: HotAttr;
    em: HotAttr;
    embed: HotAttr;
    fieldset: HotAttr;
    figcaption: HotAttr;
    figure: HotAttr;
    footer: HotAttr;
    form: HotAttr;
    h1: HotAttr;
    h2: HotAttr;
    h3: HotAttr;
    h4: HotAttr;
    h5: HotAttr;
    h6: HotAttr;
    head: HotAttr;
    header: HotAttr;
    hr: HotAttr;
    html: HotAttr;
    i: HotAttr;
    iframe: HotAttr;
    img: HotAttr;
    input: HotAttr;
    ins: HotAttr;
    kbd: HotAttr;
    label: HotAttr;
    legend: HotAttr;
    li: HotAttr;
    link: HotAttr;
    main: HotAttr;
    map: HotAttr;
    mark: HotAttr;
    meta: HotAttr;
    meter: HotAttr;
    nav: HotAttr;
    noscript: HotAttr;
    object: HotAttr;
    ol: HotAttr;
    optgroup: HotAttr;
    option: HotAttr;
    output: HotAttr;
    p: HotAttr;
    param: HotAttr;
    picture: HotAttr;
    pre: HotAttr;
    progress: HotAttr;
    q: HotAttr;
    rp: HotAttr;
    rt: HotAttr;
    ruby: HotAttr;
    s: HotAttr;
    samp: HotAttr;
    script: HotAttr;
    section: HotAttr;
    select: HotAttr;
    small: HotAttr;
    source: HotAttr;
    span: HotAttr;
    strong: HotAttr;
    style: HotAttr;
    sub: HotAttr;
    summary: HotAttr;
    sup: HotAttr;
    table: HotAttr;
    tbody: HotAttr;
    td: HotAttr;
    template: HotAttr;
    textarea: HotAttr;
    tfoot: HotAttr;
    th: HotAttr;
    thead: HotAttr;
    time: HotAttr;
    title: HotAttr;
    tr: HotAttr;
    track: HotAttr;
    u: HotAttr;
    ul: HotAttr;
    var: HotAttr;
    video: HotAttr;
    wbr: HotAttr;
  }
}
