import "./monaco";
import * as monaco from "monaco-editor";
import AlifCodemirrorEditor from "./codemirror";
import AlifCodemirrorEditor_V6 from "./codemirror-v6";
import "./styles.css";
import fs from "fs";

const alifExample0 = fs.readFileSync(
  __dirname + "/alif-examples/0.ألف",
  "utf8"
);

const alifExample1 = fs.readFileSync(
  __dirname + "/alif-examples/1.ألف",
  "utf8"
);

const alifExample2 = fs.readFileSync(
  __dirname + "/alif-examples/2.ألف",
  "utf8"
);

const alifExamples = [alifExample0, alifExample1, alifExample2];
let currentExample =
  alifExamples[Number(document.getElementById("example-num").value)];

const editors = {
  codemirror: {
    container: document.querySelector("#codemirror-editor > .editor-container"),
    radio: document.getElementById("codemirror-radio"),
    initit: initCodemirrorEditor,
  },
  codemirror_V6: {
    container: document.querySelector(
      "#codemirror-v6-editor > .editor-container"
    ),
    radio: document.getElementById("codemirror-v6-radio"),
    initit: initCodemirrorEditor_V6,
  },
  monaco: {
    container: document.querySelector("#monaco-editor > .editor-container"),
    radio: document.getElementById("monaco-radio"),
    initit: initMonacoEditor,
  },
};

function initCodemirrorEditor() {
  const component = new AlifCodemirrorEditor({
    parent: editors.codemirror.container,
    value: currentExample,
  });
  editors.codemirror.component = component;
  return component;
}

function initCodemirrorEditor_V6() {
  const component = new AlifCodemirrorEditor_V6({
    parent: editors.codemirror_V6.container,
    value: currentExample,
  });
  editors.codemirror_V6.component = component;
  return component;
}

function initMonacoEditor() {
  return (editors.monaco.component = monaco.editor.create(
    editors.monaco.container,
    {}
  ));
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
    const { container, initit, radio } = editor;
    if (radio.checked) {
      // hide all, deactivate
      Object.values(editors).forEach((e) => {
        e.active = false;
        e.container.parentElement.style.display = "none";
      });
      // show me only
      container.parentElement.style.display = "block";
      // activate
      editor.active = true;
      // init if not already
      if (!editor.inited) {
        editor.inited = true;
        container.dataset.inited = "true";
        initit();
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

  const exampleNum = document.getElementById("example-num");
  exampleNum.onchange = () => {
    const num = Number(exampleNum.value);
    currentExample = alifExamples[num];
    console.log(`اختيار المثال ${num}`);
    setExampleCode();
  };
}

init();

// module?.hot.decline();
