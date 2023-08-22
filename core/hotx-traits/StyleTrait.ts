export default function StyleTrait(el: HTMLElement, prop: string, val: string) {
  el.style[prop as any] = val;
}
