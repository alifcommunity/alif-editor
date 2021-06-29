// prettier-ignore
const tokens = [
  "صنف", "كائن", "دالة", "إذا", "أو", "وإلا", "و",
  "نافذة", "كلما", "نهاية", "رئيسية", "إرجاع"
];

const variableRegex = /[_a-z\u0621-\u064A][\w\u0621-\u064A]+/i;

export default {
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
    //   regex: new RegExp(`(دالة)\\s+(${variableRegex.source})(?:\\s*\\(?:.*\\))?`),
    //   token: ["keyword", "varaible"],
    //   indent: true,
    //   sol: true
    // },
    // {
    //   regex: new RegExp(`(صنف)\\s+(${variableRegex.source})`),
    //   token: ["keyword", "varaible-3"],
    //   indent: true,
    //   sol: true
    // },
    // { regex: /[نهاية\s+(إذا|دالة|صنف)]/, token: "keyword", dedent: true },
    { regex: /--.*/, token: "comment" },
    { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: "number"
    },
    {
      regex: /٠س[أبجدهو٠١٢٣٤٥٦٧٨٩]+|[-+]?(?:\.[٠١٢٣٤٥٦٧٨٩]+|[٠١٢٣٤٥٦٧٨٩]+\.?[٠١٢٣٤٥٦٧٨٩]*)(?:e[-+]?[٠١٢٣٤٥٦٧٨٩]+)?/i,
      token: "number"
    },
    { regex: /#[\u0621-\u064A_]+/, token: "header" },
    { regex: /\*|\+|-|\/|,|:|=/, token: "operator" },
    {
      regex: new RegExp(`(?:${tokens.join("|")})(?![\\w\\u0621-\\u064A])`),
      token: "keyword"
    },
    { regex: /خطأ|صحيح|عدد|منطق|نص(?![\w\u0621-\u064A])/, token: "atom" },
    { regex: variableRegex, token: "variable" },
  ],
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "--"
  }
}
