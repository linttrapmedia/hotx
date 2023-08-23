export default function ActionTrait(
  el: HTMLElement,
  method: string,
  action: string
) {
  console.log('action', method, action);
  el.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('submit called');
    // const formData = new FormData(el as HTMLFormElement);
    // const res = await fetch(action, {
    //   method: method,
    //   body: formData,
    // });
    // const html = await res.text();
    // el.innerHTML = html;
  });
}
