import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/python/python.js";

import { isIdentifierName } from "@babel/helper-validator-identifier";

const tokens = [
  "صنف",
  "كائن",
  "دالة",
  "إذا",
  "أو",
  "وإلا",
  "و",
  "_ج_",
  "_س_",
  "_ب_",
  "نافذة ",
  "كلما",
  "نهاية",
  "رئيسية",
  "إرجاع"
];

CodeMirror.defineSimpleMode("alif", {
  start: [
    {
      regex: /_ج_/,
      token: "comment",
      mode: { spec: "javascript", end: /_ج_/ }
    },
    {
      regex: /_ب_/,
      token: "comment",
      mode: { spec: "python", end: /_ب_/ }
    },
    { regex: /_س_/, token: "comment", mode: { spec: "clike", end: /_س_/ } },

    {
      regex: new RegExp(`(?:${tokens.join("|")})`),
      token: "keyword"
    },

    { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },

    { regex: /خطأ|صحيح|عدد|منطق|نص/, token: "atom" },
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: "number"
    },
    {
      regex: /٠س[أبجدهو٠١٢٣٤٥٦٧٨٩]+|[-+]?(?:\.[٠١٢٣٤٥٦٧٨٩]+|[٠١٢٣٤٥٦٧٨٩]+\.?[٠١٢٣٤٥٦٧٨٩]*)(?:e[-+]?[٠١٢٣٤٥٦٧٨٩]+)?/i,
      token: "number"
    },
    { regex: /--.*/, token: "comment" },
    { regex: /#[\u0621-\u064A_]+/, token: "header" },
    { regex: /\*|\+|-|\/|,|:|=/, token: "operator" },
    { regex: /[_a-z\u0621-\u064A][\w\u0621-\u064A]+/i, token: null }
  ],
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "--"
  }
});

CodeMirror.defineMIME("text/alif", "alif");

// CodeMirror.defineMode("jinja2", function () {
//   var keywords = [
//       "and",
//       "as",
//       "block",
//       "endblock",
//       "by",
//       "cycle",
//       "debug",
//       "else",
//       "elif",
//       "extends",
//       "filter",
//       "endfilter",
//       "firstof",
//       "for",
//       "endfor",
//       "if",
//       "endif",
//       "ifchanged",
//       "endifchanged",
//       "ifequal",
//       "endifequal",
//       "ifnotequal",
//       "endifnotequal",
//       "in",
//       "include",
//       "load",
//       "not",
//       "now",
//       "or",
//       "parsed",
//       "regroup",
//       "reversed",
//       "spaceless",
//       "endspaceless",
//       "ssi",
//       "templatetag",
//       "openblock",
//       "closeblock",
//       "openvariable",
//       "closevariable",
//       "openbrace",
//       "closebrace",
//       "opencomment",
//       "closecomment",
//       "widthratio",
//       "url",
//       "with",
//       "endwith",
//       "get_current_language",
//       "trans",
//       "endtrans",
//       "noop",
//       "blocktrans",
//       "endblocktrans",
//       "get_available_languages",
//       "get_current_language_bidi",
//       "plural"
//     ],
//     operator = /^[+\-*&%=<>!?|~^]/,
//     sign = /^[:\[\(\{]/,
//     atom = ["true", "false"],
//     number = /^(\d[+\-\*\/])?\d+(\.\d+)?/;

//   keywords = new RegExp("((" + keywords.join(")|(") + "))\\b");
//   atom = new RegExp("((" + atom.join(")|(") + "))\\b");

//   function tokenBase(stream, state) {
//     var ch = stream.peek();

//     //Comment
//     if (state.incomment) {
//       if (!stream.skipTo("#}")) {
//         stream.skipToEnd();
//       } else {
//         stream.eatWhile(/\#|}/);
//         state.incomment = false;
//       }
//       return "comment";
//       //Tag
//     } else if (state.intag) {
//       //After operator
//       if (state.operator) {
//         state.operator = false;
//         if (stream.match(atom)) {
//           return "atom";
//         }
//         if (stream.match(number)) {
//           return "number";
//         }
//       }
//       //After sign
//       if (state.sign) {
//         state.sign = false;
//         if (stream.match(atom)) {
//           return "atom";
//         }
//         if (stream.match(number)) {
//           return "number";
//         }
//       }

//       if (state.instring) {
//         if (ch == state.instring) {
//           state.instring = false;
//         }
//         stream.next();
//         return "string";
//       } else if (ch == "'" || ch == '"') {
//         state.instring = ch;
//         stream.next();
//         return "string";
//       } else if (
//         stream.match(state.intag + "}") ||
//         (stream.eat("-") && stream.match(state.intag + "}"))
//       ) {
//         state.intag = false;
//         return "tag";
//       } else if (stream.match(operator)) {
//         state.operator = true;
//         return "operator";
//       } else if (stream.match(sign)) {
//         state.sign = true;
//       } else {
//         if (stream.eat(" ") || stream.sol()) {
//           if (stream.match(keywords)) {
//             return "keyword";
//           }
//           if (stream.match(atom)) {
//             return "atom";
//           }
//           if (stream.match(number)) {
//             return "number";
//           }
//           if (stream.sol()) {
//             stream.next();
//           }
//         } else {
//           stream.next();
//         }
//       }
//       return "variable";
//     } else if (stream.eat("{")) {
//       if (stream.eat("#")) {
//         state.incomment = true;
//         if (!stream.skipTo("#}")) {
//           stream.skipToEnd();
//         } else {
//           stream.eatWhile(/\#|}/);
//           state.incomment = false;
//         }
//         return "comment";
//         //Open tag
//       } else if ((ch = stream.eat(/\{|%/))) {
//         //Cache close tag
//         state.intag = ch;
//         if (ch == "{") {
//           state.intag = "}";
//         }
//         stream.eat("-");
//         return "tag";
//       }
//     }
//     stream.next();
//   }

//   return {
//     startState: function () {
//       return { tokenize: tokenBase };
//     },
//     token: function (stream, state) {
//       return state.tokenize(stream, state);
//     },
//     blockCommentStart: "{#",
//     blockCommentEnd: "#}"
//   };
// });

// CodeMirror.defineMIME("text/jinja2", "jinja2");
