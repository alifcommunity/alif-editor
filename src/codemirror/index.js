import "./styles.css";
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

import "./alif-mode.js";

CodeMirror.commands.autocomplete = function (cm) {
  cm.showHint({ hint: CodeMirror.hint.anyword });
};
