type Attr = {
  "hot-x"?: (
    | ["trigger", string]
    | ["request", string]
    | ["append", string]
    | ["prepend", string]
    | ["replace", string]
    | ["clear", string]
    | ["select", string, string]
  )[];
  [key: string]: any;
};

type HotxRequest = any;

namespace JSX {
  type Element = string | any;
  interface IntrinsicElements {
    [key: string]: any;
    a: Attr;
    abbr: Attr;
    address: Attr;
    area: Attr;
    article: Attr;
    aside: Attr;
    audio: Attr;
    b: Attr;
    base: Attr;
    bdi: Attr;
    bdo: Attr;
    blockquote: Attr;
    body: Attr;
    br: Attr;
    button: Attr;
    canvas: Attr;
    caption: Attr;
    cite: Attr;
    code: Attr;
    col: Attr;
    colgroup: Attr;
    data: Attr;
    datalist: Attr;
    dd: Attr;
    del: Attr;
    details: Attr;
    dfn: Attr;
    dialog: Attr;
    div: Attr;
    dl: Attr;
    dt: Attr;
    em: Attr;
    embed: Attr;
    fieldset: Attr;
    figcaption: Attr;
    figure: Attr;
    footer: Attr;
    form: Attr;
    h1: Attr;
    h2: Attr;
    h3: Attr;
    h4: Attr;
    h5: Attr;
    h6: Attr;
    head: Attr;
    header: Attr;
    hr: Attr;
    html: Attr;
    i: Attr;
    iframe: Attr;
    img: Attr;
    input: Attr;
    ins: Attr;
    kbd: Attr;
    label: Attr;
    legend: Attr;
    li: Attr;
    link: Attr;
    main: Attr;
    map: Attr;
    mark: Attr;
    meta: Attr;
    meter: Attr;
    nav: Attr;
    noscript: Attr;
    object: Attr;
    ol: Attr;
    optgroup: Attr;
    option: Attr;
    output: Attr;
    p: Attr;
    param: Attr;
    picture: Attr;
    pre: Attr;
    progress: Attr;
    q: Attr;
    rp: Attr;
    rt: Attr;
    ruby: Attr;
    s: Attr;
    samp: Attr;
    script: Attr;
    section: Attr;
    select: Attr;
    small: Attr;
    source: Attr;
    span: Attr;
    strong: Attr;
    style: Attr;
    sub: Attr;
    summary: Attr;
    sup: Attr;
    table: Attr;
    tbody: Attr;
    td: Attr;
    template: Attr;
    textarea: Attr;
    tfoot: Attr;
    th: Attr;
    thead: Attr;
    time: Attr;
    title: Attr;
    tr: Attr;
    track: Attr;
    u: Attr;
    ul: Attr;
    var: Attr;
    video: Attr;
    wbr: Attr;
  }
}
