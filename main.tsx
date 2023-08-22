function test() {
  return (
    <div hot-trigger="click" hot-request="/handler" hot-replace="#list">
      <ul id="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

console.log(test());
