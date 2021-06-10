import "./styles.css";
import "./monaco";
import "./codemirror";
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

const alifExamples = [alifExample0];
// const alifExamples = [alifExample0, alifExample1, alifExample2];

const codemirrorEditorsContainer =
  document.getElementById("codemirror-editors");
const monacoEditorsContainer = document.getElementById("monaco-editors");

function initEditors() {
  alifExamples.forEach((alifCode) => {
    CodeMirror(codemirrorEditorsContainer, {
      value: alifCode,
      lineNumbers: true,
      lineWrapping: true,
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
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        Tab: (cm) => {
          if (cm.getMode().name === "null") {
            cm.execCommand("insertTab");
          } else {
            if (cm.somethingSelected()) {
              cm.execCommand("indentMore");
            } else {
              cm.execCommand("insertSoftTab");
            }
          }
        },
        Backspace: (cm) => {
          if (!cm.somethingSelected()) {
            let cursorsPos = cm
              .listSelections()
              .map((selection) => selection.anchor);
            let indentUnit = cm.options.indentUnit;
            let shouldDelChar = false;
            for (let cursorIndex in cursorsPos) {
              let cursorPos = cursorsPos[cursorIndex];
              let lineContent = cm.doc.getLine(cursorPos.line);
              let indentation = lineContent.match(/^\s+/)?.[0].length ?? 0;
              // let indentation = cm.getStateAfter(cursorPos.line).indented;
              if (
                !(
                  indentation !== 0 &&
                  cursorPos.ch <= indentation &&
                  cursorPos.ch % indentUnit === 0
                )
              ) {
                shouldDelChar = true;
              }
            }
            if (!shouldDelChar) {
              cm.execCommand("indentLess");
            } else {
              cm.execCommand("delCharBefore");
            }
          } else {
            cm.execCommand("delCharBefore");
          }
        },
        "Shift-Tab": (cm) => cm.execCommand("indentLess")
      }
    });

    const container = document.createElement("div");
    container.classList.add("monaco-editor-container");
    monacoEditorsContainer.append(container);
    monaco.editor.create(container, {
      value: alifCode,
    });
  });
}

function afterLoaded() {
  if (document.getElementById("codemirror-cb").checked) {
    codemirrorEditorsContainer.style.display = "block";
    monacoEditorsContainer.style.display = "none";
  } else {
    codemirrorEditorsContainer.style.display = "none";
    monacoEditorsContainer.style.display = "block";
  }

  document.getElementById("codemirror-cb").addEventListener("change", (e) => {
    if (e.target.checked) {
      codemirrorEditorsContainer.style.display = "block";
      monacoEditorsContainer.style.display = "none";
    }
  });

  document.getElementById("monaco-cb").addEventListener("change", (e) => {
    if (e.target.checked) {
      monacoEditorsContainer.style.display = "block";
      codemirrorEditorsContainer.style.display = "none";
    }
  });
}

afterLoaded();

initEditors();

// module?.hot.decline();
