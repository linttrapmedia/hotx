export default function MutateDomTrait(
  el: HTMLElement,
  operation: string,
  target: string,
  property: string,
  method: string,
  action: string
) {
  const eventType = 'click';
  el.addEventListener(eventType, function (e) {
    fetch(action, {
      method: method,
      headers: {
        'Content-Type': 'text/html',
      },
    }).then(async (response) => {
      if (response.ok) {
        const html = await response.text();
        const targetEl: any =
          target === 'this' ? el : document.querySelector(target);
        if (operation === 'replace') targetEl[property] = html;
      }
    });
  });
}
