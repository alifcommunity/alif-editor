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
    // {
    //   regex: /دالة\s+.*/,
    //   token: "keyword",
    //   indent: true,
    //   sol: true
    // },
    // { regex: /[نهاية\s+(إذا|دالة)]/, token: "keyword", dedent: true },
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
    { regex: /[_a-z\u0621-\u064A][\w\u0621-\u064A]+/i, token: "variable" }
  ],
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "--"
  }
});

CodeMirror.defineMIME("text/alif", "alif");
