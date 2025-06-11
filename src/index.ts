console.log("Hello via Bun!");
// 3099 / 30
// 1499 / 30

// 104
// 50

const WEEKS = 5200;
const FACTORS = [
  1, 2, 4, 5, 8, 10, 13, 16, 20, 25, 26, 40, 50, 52, 65, 80, 100, 104,
];
const WIDTH = 104;
const HEIGHT = 50;

/**
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 */
function htmlToNode(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;

  const nNodes = template.content.childNodes.length;
  if (nNodes !== 1) {
    throw new Error(
      `html parameter must represent a single node; got ${nNodes}. ` +
        "Note that leading or trailing spaces around an element in your " +
        'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
        "the element; call .trim() on your input to avoid this.",
    );
  }

  return template.content.firstChild as Element;
}

const CLASSES_BG_COLOR = [
  "bg-red",
  "bg-blue",
  "bg-blue-dim",
  "bg-blue-dark",
  "bg-yellow",
  "bg-orange",
  "bg-blue-alt",
  "bg-purple",
];

function main() {
  const weeksContainer = document.querySelector(`#weeks`) as HTMLDivElement;

  // weeksContainer.style.gridTemplateColumns = `repeat(${WIDTH}, min-content)`;

  for (let i = 0; i < 5200; i++) {
    // const color =
    //   CLASSES_BG_COLOR[Math.floor(Math.random() * CLASSES_BG_COLOR.length)];

    const color = i < 300 ? `bg-blue-dark` : `bg-blue`;
    const html = `<div data-week="${i + 1}" class="week ${color}"></div>`;
    const element = htmlToNode(html);
    weeksContainer.append(element);
  }
}

main();
