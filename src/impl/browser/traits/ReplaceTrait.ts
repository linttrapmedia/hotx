import MutateDomTrait from './MutateDomTrait';

export default function ReplaceTrait(
  el: HTMLElement,
  attr: string,
  target: string,
  method: string,
  action: string
) {
  return MutateDomTrait(el, 'replace', attr, target, method, action);
}
