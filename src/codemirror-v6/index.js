import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
// import { oneDark } from "@codemirror/theme-one-dark";
import { lineNumbers } from "@codemirror/gutter";
import { StreamLanguage } from "@codemirror/stream-parser";
import { javascript } from "@codemirror/lang-javascript";
// import { javascript } from "@codemirror/legacy-modes/mode/javascript";
import { simpleMode } from "@codemirror/legacy-modes/mode/simple-mode";
import { alifSimpleModeStates } from "../codemirror/alif-mode";

const arNums = ["٠", "١", "٢", "٣", "٤", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArNum(num) {
  return num.toString().replace(/\d/g, (match) => {
    return arNums[parseInt(match)];
  });
}

export default function AlifCodemirrorEditor_V6(options) {
  let { parent, value } = options;
  if (!(this instanceof AlifCodemirrorEditor_V6))
    return new AlifCodemirrorEditor_V6(options); // instantiate with `new`

  this.__proto__ = new EditorView({
    state: EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        // oneDark,
        lineNumbers({ formatNumber: (lineNo, state) => toArNum(lineNo) }),
        javascript(),
        // StreamLanguage.define(javascript),
        StreamLanguage.define(simpleMode(alifSimpleModeStates)),
      ],
    }),
    parent,
  });
}
