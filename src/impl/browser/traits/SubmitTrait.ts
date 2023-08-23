export default function SubmitTrait(el: HTMLElement, target: string) {
  el.addEventListener('click', async (e) => {
    const element = document.querySelector(target);
    element.submit();
  });
}
