import hljs from 'highlight.js';

function Highlight(options) {
  if (!(this instanceof Highlight))
    return new Highlight(options);

  Object.assign(this, options);
  if(this.value) this.setCode(this.value);
}

Highlight.prototype.setCode = function setCode(code) {
  let style = "display: grid; place-items: center; direction: rtl";
  this.parent.innerHTML = `<div style=${JSON.stringify(style)}><pre>${code}</pre></div>`;
}

export default Highlight;

