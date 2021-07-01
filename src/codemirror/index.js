// Alif Codemirror Editor Component

import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/theme/darcula.css";

import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";

import keyBindings from "./key-bindings.js";
import "./alif-mode.js";
import codemirror from "codemirror";

CodeMirror.commands.autocomplete = function (cm) {
  cm.showHint({ hint: CodeMirror.hint.anyword });
};

export default function AlifCodemirrorEditor(options) {
  const { parent, value, onCodeChange } = options;
  if (!(this instanceof AlifCodemirrorEditor))
    return new AlifCodemirrorEditor(options);
  // const textarea = document.getElementById("RichTextArea");
  // // so explicitly assign value to textarea object.
  // textarea.value = value ?? "";

  this.__proto__ = CodeMirror(parent, {
    value: value ?? "",
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
    extraKeys: keyBindings,
  });

  this.setSize("100%", "100%");
  onCodeChange && this.on("change", (cm) => onCodeChange(cm.getValue()));
}
