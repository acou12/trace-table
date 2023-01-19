const codeTextarea = document.querySelector("textarea")!;
const variablesInput = document.querySelector(
  ".variables"
)! as HTMLInputElement;
const generateButton = document.querySelector("button")!;
const traceTable = document.querySelector(".grid")! as HTMLDivElement;

declare const hljs: {
  highlightAll(): void;
};

const generate = () => {
  traceTable.innerHTML = "";

  const variables = variablesInput.value.split(",").map((v) => v.trim());
  const codeLines = codeTextarea.value.split("\n");

  const addCell = (content: string, type: "code" | "variable" | "empty") => {
    const preElement = document.createElement("pre");
    const codeElement = document.createElement("code");
    codeElement.classList.add(
      type === "code" ? "language-java" : "nohighlight"
    );
    codeElement.innerHTML = content;
    if (type === "variable") {
      preElement.contentEditable = "true";
      preElement.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          if (!codeElement.innerHTML.endsWith(" "))
            codeElement.innerHTML += " ";
          setTimeout(() => {
            const node = window.getSelection()!.focusNode as Node & {
              data: string;
            };
            if (!node.data.endsWith(" ")) node.data += " ";
            window.getSelection()?.setPosition(node, node.data.length);
          }, 1);
        }
      });
    }
    preElement.appendChild(codeElement);
    traceTable.appendChild(preElement);
  };

  traceTable.style.gridTemplateColumns = `auto repeat(${variables.length}, 1fr)`;
  for (let i = 0; i < codeLines.length * 2; i++) {
    if (i % 2 === 0) {
      addCell(codeLines[i / 2], "code");
      for (let j = 0; j < variables.length; j++) addCell("", "empty");
    } else {
      addCell("", "empty");
      for (let j = 0; j < variables.length; j++)
        addCell(`${variables[j]} = `, "variable");
    }
  }

  hljs.highlightAll();
};

generateButton.addEventListener("click", generate);

// add a quick demo for new users
if (codeTextarea.value.length === 0 && variablesInput.value.length === 0) {
  codeTextarea.value = `
int i = 10, j = 0, n = 0;
while (i > 0) {
    i--;
    j++;
    n = n + i - j;
}
  `.trim();

  variablesInput.value = `i, j, n`;
}
