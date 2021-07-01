import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { defaultTabBinding } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { lineNumbers } from "@codemirror/gutter";
import { StreamLanguage } from "@codemirror/stream-parser";
import { javascript } from "@codemirror/lang-javascript";
import { simpleMode } from "@codemirror/legacy-modes/mode/simple-mode";
import alifSimpleModeStates from "../codemirror/alif-simple-mode-states";

const arNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArNum(num) {
  return num.toString().replace(/\d/g, (match) => {
    return arNums[parseInt(match)];
  });
}

export default function AlifCodemirrorEditor_V6(options) {
  let { parent, value, onCodeChange } = options;
  if (!(this instanceof AlifCodemirrorEditor_V6))
    return new AlifCodemirrorEditor_V6(options); // instantiate with `new`

  this.__proto__ = new EditorView({
    state: EditorState.create({
      doc: value,
      extensions: [
        onCodeChange && EditorView.updateListener.of(update => {
          onCodeChange(update.state.doc.toString());
        }),
        basicSetup,
        oneDark,
        keymap.of([defaultTabBinding]),
        lineNumbers({ formatNumber: toArNum }),
        // FIXME: to overrides alif mode, I want to use js mode it its position
        // javascript(),
        StreamLanguage.define(simpleMode(alifSimpleModeStates)),
      ],
    }),
    parent,
  });
}
