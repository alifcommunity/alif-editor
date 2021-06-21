import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/python/python.js";
import alifSimpleModeStates from './alif-simple-mode-states.js'

// import { isIdentifierName } from "@babel/helper-validator-identifier";

CodeMirror.defineSimpleMode("alif", alifSimpleModeStates);

CodeMirror.defineMIME("text/alif", "alif");
