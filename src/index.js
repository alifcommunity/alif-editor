import "regenerator-runtime/runtime.js";
import alifExamples from "./alif-examples";
import "./styles.css";

let currentExample = alifExamples[Number(sel("#example-num").value)];

const editors = {
  codemirror: {
    parent: sel("#codemirror-editor"),
    container: sel("#codemirror-editor .editor-container"),
    radio: sel("#codemirror-radio"),
    initit: initCodemirrorEditor,
  },
  codemirror_V6: {
    parent: sel("#codemirror-v6-editor"),
    container: sel("#codemirror-v6-editor .editor-container"),
    radio: sel("#codemirror-v6-radio"),
    initit: initCodemirrorEditor_V6,
  },
  monaco: {
    parent: sel("#monaco-editor"),
    container: sel("#monaco-editor .editor-container"),
    radio: sel("#monaco-radio"),
    initit: initMonacoEditor,
  },
};

function sel(selector) {
  return document.querySelector(selector);
}

async function initCodemirrorEditor() {
  editors.codemirror.container.classList.add("loading");
  const AlifCodemirrorEditor = (await import("./codemirror")).default;
  const component = new AlifCodemirrorEditor({
    parent: editors.codemirror.container,
    value: currentExample,
  });
  editors.codemirror.container.classList.remove("loading");
  editors.codemirror.component = component;
  return component;
}

async function initCodemirrorEditor_V6() {
  editors.codemirror_V6.container.classList.add("loading");
  const AlifCodemirrorEditor_V6 = (await import("./codemirror-v6")).default;
  const component = new AlifCodemirrorEditor_V6({
    parent: editors.codemirror_V6.container,
    value: currentExample,
  });
  editors.codemirror_V6.container.classList.remove("loading");
  editors.codemirror_V6.component = component;
  return component;
}

async function initMonacoEditor() {
  editors.monaco.container.classList.add("loading");
  const monaco = await import("monaco-editor");
  const component = monaco.editor.create(editors.monaco.container, {});
  editors.monaco.container.classList.remove("loading");
  editors.monaco.component = component;
  return component;
}

function setExampleCode(code = currentExample) {
  if (editors.codemirror_V6.active) {
    const view = editors.codemirror_V6.component;
    const length = view.state.doc.length;
    const transaction = view.state.update({
      changes: { from: 0, to: length - 1, insert: code },
    });
    view.dispatch(transaction);
  } else if (editors.codemirror.active) {
    const component = editors.codemirror.component;
    component.setValue(code);
  } else {
  }
}

function init() {
  // -------------------------------
  // choose an editor
  // -------------------------------

  function radioChecked(editor) {
    const { parent, initit, radio } = editor;
    if (radio.checked) {
      // hide all, deactivate
      Object.values(editors).forEach((e) => {
        e.active = false;
        e.parent.style.display = "none";
      });
      // show me only
      parent.style.display = "grid";
      // activate
      editor.active = true;
      // init if not already
      if (!editor.inited) {
        editor.inited = true;
        parent.dataset.inited = "true";
        initit();
      } else {
        setExampleCode();
      }
    }
  }

  for (let editor in editors) {
    editor = editors[editor];
    radioChecked(editor);
    editor.radio.addEventListener("change", () => {
      radioChecked(editor);
    });
  }

  // -------------------------------
  // choose an example
  // -------------------------------

  const exampleNum = sel("#example-num");
  exampleNum.onchange = () => {
    const num = Number(exampleNum.value);
    currentExample = alifExamples[num];
    console.log(`اختيار المثال ${num}`);
    setExampleCode();
  };
}

init();

// module?.hot.decline();
