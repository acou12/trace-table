"use strict";
var codeTextarea = document.querySelector("textarea");
var variablesInput = document.querySelector(".variables");
var generateButton = document.querySelector("button");
var traceTable = document.querySelector(".grid");
var generate = function () {
    traceTable.innerHTML = "";
    var variables = variablesInput.value.split(",").map(function (v) { return v.trim(); });
    var codeLines = codeTextarea.value.split("\n");
    var addCell = function (content, type) {
        var preElement = document.createElement("pre");
        var codeElement = document.createElement("code");
        codeElement.classList.add(type === "code" ? "language-java" : "nohighlight");
        codeElement.innerHTML = content;
        if (type === "variable") {
            preElement.contentEditable = "true";
            preElement.addEventListener("keydown", function (e) {
                if (e.key === "Tab") {
                    if (!codeElement.innerHTML.endsWith(" "))
                        codeElement.innerHTML += " ";
                    setTimeout(function () {
                        var _a;
                        var node = window.getSelection().focusNode;
                        if (!node.data.endsWith(" "))
                            node.data += " ";
                        (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.setPosition(node, node.data.length);
                    }, 1);
                }
            });
        }
        preElement.appendChild(codeElement);
        traceTable.appendChild(preElement);
    };
    traceTable.style.gridTemplateColumns = "auto repeat(".concat(variables.length, ", 1fr)");
    for (var i = 0; i < codeLines.length * 2; i++) {
        if (i % 2 === 0) {
            addCell(codeLines[i / 2], "code");
            for (var j = 0; j < variables.length; j++)
                addCell("", "empty");
        }
        else {
            addCell("", "empty");
            for (var j = 0; j < variables.length; j++)
                addCell("".concat(variables[j], " = "), "variable");
        }
    }
    hljs.highlightAll();
};
generateButton.addEventListener("click", generate);
// add a quick demo for new users
if (codeTextarea.value.length === 0 && variablesInput.value.length === 0) {
    codeTextarea.value = "\nint i = 10, j = 0, n = 0;\nwhile (i > 0) {\n\u00A0\u00A0\u00A0\u00A0i--;\n\u00A0\u00A0\u00A0\u00A0j++;\n\u00A0\u00A0\u00A0\u00A0n = n + i - j;\n}\n  ".trim();
    variablesInput.value = "i, j, n";
}
