export default function EventTrait(
  el: HTMLElement,
  type: string,
  func: string,
  ...args: any[]
) {
  el.addEventListener(type, function (e) {
    eval(func)(...args);
  });
}
