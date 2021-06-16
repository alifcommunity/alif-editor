import "./monaco";
import "./codemirror";
import "./styles.css";
import codemirror5KeyBindings from "./codemirror/key-bindings.js";
import CodeMirror from "codemirror";
import * as monaco from "monaco-editor";

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
    inited: false,
    initit: initCodemirrorEditor,
  },
  codemirror_V6: {
    container: document.querySelector(
      "#codemirror-v6-editor > .editor-container"
    ),
    radio: document.getElementById("codemirror-v6-radio"),
    inited: false,
    initit: initCodemirrorEditor_V6,
  },
  monaco: {
    container: document.querySelector("#monaco-editor > .editor-container"),
    radio: document.getElementById("monaco-radio"),
    inited: false,
    initit: initMonacoEditor,
  },
};

function initCodemirrorEditor() {
  CodeMirror(editors.codemirror.container, {
    value: currentExample,
    lineNumbers: true,
    // lineWrapping: true,
    direction: "rtl",
    rtlMoveVisually: true,
    styleActiveLine: true,
    autoCloseBrackets: true,
    indentUnit: 4,
    matchBrackets: true,
    mode: "alif",
    theme: "darcula",
    indentWithTabs: false,
    smartIndent: true,
    extraKeys: codemirror5KeyBindings,
  });
}

function initCodemirrorEditor_V6() {}

function initMonacoEditor() {
  monaco.editor.create(editors.monaco.container, {});
}

function setExampleCode() {
  if (editors.codemirror.radio.checked);
}

function init() {
  // -------------------------------
  // choose an editor
  // -------------------------------

  function radioChecked(editor) {
    const { container, initit, radio } = editor;
    if (radio.checked) {
      Object.values(editors).forEach(
        (e) => (e.container.parentElement.style.display = "none")
      );
      container.parentElement.style.display = "block";
      if (!editor.inited) {
        editor.inited = true;
        container.dataset.inited = "true";
        initit();
      }
    }
  }

  for (let editor in editors) {
    editor = editors[editor]
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
