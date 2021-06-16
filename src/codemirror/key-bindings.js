export default {
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
      let cursorsPos = cm.listSelections().map((selection) => selection.anchor);
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
  "Shift-Tab": (cm) => cm.execCommand("indentLess"),
};
