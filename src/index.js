import "regenerator-runtime/runtime.js";
import alifExamples from "./alif-examples";
import "./styles.css";

const LOCALE_STORAGE_CODE_KEY = "alif-code";
let currentExampleNum = -1;

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
  highlight: {
    parent: sel("#highlight-editor"),
    container: sel("#highlight-editor .editor-container"),
    radio: sel("#highlight-radio"),
    initit: initHighlightEditor,
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
    onCodeChange
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
    onCodeChange
  });
  editors.codemirror_V6.container.classList.remove("loading");
  editors.codemirror_V6.component = component;
  return component;
}

async function initMonacoEditor() {
  const editor = editors.monaco;
  editor.container.classList.add("loading");

  const monaco = await import("monaco-editor");
  // lazy load monaco-editor package
  const component = monaco.editor.create(editor.container, {});
  // change theme
  const themeData = await import("monaco-themes/themes/Monokai.json");
  monaco.editor.defineTheme("monokai", themeData);
  monaco.editor.setTheme("monokai");
  
  editor.container.classList.remove("loading");
  editor.component = component;
  return component;
}

async function initHighlightEditor() {
  const editor = editors.highlight;
  editor.container.classList.add("loading");
  const Highlight = (await import("./highlight")).default;
  const component = new Highlight({ parent: editor.container });
  editor.container.classList.remove("loading");
  editor.component = component;
  return component;
}

function setExampleCode(code, isReadOnly) {
  code =
    code ?? currentExampleNum === -1
      ? localStorage.getItem(LOCALE_STORAGE_CODE_KEY)
      : alifExamples[currentExampleNum];
  code = code ?? ""; // if nothing in the local storage
  isReadOnly = isReadOnly ?? currentExampleNum !== -1;
  if (editors.codemirror_V6.active) {
    const view = editors.codemirror_V6.component;
    const length = view.state.doc.length;
    const to = length === 0 ? 0 : length - 1;
    const transaction = view.state.update({ changes: { from: 0, to, insert: code } });
    view.dispatch(transaction);
  } else if (editors.codemirror.active) {
    const component = editors.codemirror.component;
    component.setValue(code);
  } else if (editors.highlight.active) {
    editors.highlight.component.setCode(code);
  }
}

function onCodeChange(code) {
  if (currentExampleNum === -1)
    localStorage.setItem(LOCALE_STORAGE_CODE_KEY, code);
}

/**
 * display an element in the DOM to show some error
 */
function setError(msg, retry) {
  const errElm = document.querySelector("#error");
  const msgElm = errElm.querySelector("#error p");
  const retryBtn = errElm.querySelector("#error-retry");
  errElm.style.display = "flex";
  msgElm.innerText = msg;
  retryBtn.onchange = () => {
    errElm.style.display = "none";  
    retry();
  } 
}

function init() {
  // -------------------------------
  // choose an editor
  // -------------------------------

  async function radioChecked(editor) {
    const { parent, initit, radio } = editor;
    if (radio.checked) {
      // show me only as grid and hide all
      Object.values(editors).forEach((e) => {
        e.active = false;
        e.parent.style.display = "none";
      });
      parent.style.display = "grid";
      // activate
      editor.active = true;

      try {
        // init it if not inited
        if (!editor.inited) {
          editor.inited = true;
          parent.dataset.inited = "true";
          await initit();
        }

        // set editor's code
        setExampleCode();
      }
      catch (e) {
        console.error(e);
        setError(e.message, ()=> radioChecked(editor));
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

  const exampleNumElm = sel("#example-num");
  currentExampleNum = Number(exampleNumElm.value);
  exampleNumElm.onchange = () => {
    currentExampleNum = Number(exampleNumElm.value);
    console.log(`اختيار المثال ${currentExampleNum}`);
    // set editor's code
    try { setExampleCode(); }
    catch (e) {
      console.error(e);
      setError(e.message, ()=> radioChecked(editor));
    }
  };
}

init();

// module?.hot.decline();
