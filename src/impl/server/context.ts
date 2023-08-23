export default class Context {
  req: Request;
  headers: Headers = new Headers();
  scripts: string[] = [];
  styles: string[] = [];
  constructor(req: Request) {
    this.req = req;
    this.headers.set("Content-Type", "text/html");
    this.addScript = this.addScript.bind(this);
    this.addStyle = this.addStyle.bind(this);
    this.addHeader = this.addHeader.bind(this);
  }
  addHeader(key: string, value: string) {
    this.headers.set(key, value);
    return this;
  }
  addScript(script: string) {
    this.scripts.push(script);
    return this;
  }
  addStyle(style: string) {
    this.styles.push(style);
    return this;
  }
}
