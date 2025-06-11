import * as D from "./dateutils";

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

type Options = {
  dob: number;
  totalWeeks: number;
  highlightBirthdays: boolean;
};

enum WeekColor {
  Empty,
  Normal,
  Blue,
  Red,
  Yellow,
  Orange,
  Purple,
}

/**
 * Check if date `d` is between dates `a` and `b`, ignoring the year.
 *
 * The range is exclusive, i.e. `a <= ___ < b`
 *
 * E.g. for checking if a week contains a birthday.
 */
function rangeContainsDateYearAgnostic(a: number, d: number, b: number) {
  const start = a % 10000;
  const stop = b % 10000;
  const date = d % 10000;

  if (stop < start) {
    // date range wraps around to next year
    return start <= date || date < stop;
  } else {
    // date range is normal
    return start <= date && date < stop;
  }
}

const TODAY = D.today();

function getWeekColor(
  weekStart: number,
  weekEnd: number,
  opt: Options,
): WeekColor {
  if (
    opt.highlightBirthdays &&
    weekEnd > TODAY &&
    rangeContainsDateYearAgnostic(weekStart, opt.dob, weekEnd)
  ) {
    return WeekColor.Yellow;
  }

  if (weekStart <= TODAY && TODAY < weekEnd) {
    return WeekColor.Blue;
  }

  if (weekStart > TODAY) {
    return WeekColor.Normal;
  } else {
    return WeekColor.Empty;
  }
}

function generateWeeks(opt: Options): WeekColor[] {
  // generate dates for each week start/end interval
  const weekDates = [opt.dob];
  let d = D.toDate(opt.dob);
  console.log(d);
  for (let i = 0; i < opt.totalWeeks; i++) {
    // advance 1 week
    d.setDate(d.getDate() + 7);
    console.log(d);
    weekDates.push(D.toDateNumber(d));
  }
  console.log(weekDates);

  const rv = [];

  for (let i = 0; i < opt.totalWeeks; i++) {
    const weekStart = weekDates[i];
    const weekEnd = weekDates[i + 1];
    if (weekStart === undefined) throw `failed to get start date of week ${i}`;
    if (weekEnd === undefined) throw `failed to get end date of week ${i}`;

    rv.push(getWeekColor(weekStart, weekEnd, opt));
  }

  return rv;
}

function main() {
  const weeksContainer = document.querySelector(`#weeks`) as HTMLDivElement;

  const weeks = generateWeeks({
    dob: 20000101,
    totalWeeks: 5200,
    highlightBirthdays: true,
  });

  const html = [];

  for (let i = 0; i < weeks.length; i++) {
    const weekColor = weeks[i]!;

    let bgClass;
    switch (weekColor) {
      case WeekColor.Empty:
        bgClass = `bg-blue-dark`;
        break;
      case WeekColor.Normal:
        bgClass = `bg-blue-dim`;
        break;
      case WeekColor.Blue:
        bgClass = `bg-blue`;
        break;
      case WeekColor.Red:
        bgClass = `bg-red`;
        break;
      case WeekColor.Yellow:
        bgClass = `bg-yellow`;
        break;
      case WeekColor.Orange:
        bgClass = `bg-orange`;
        break;
      case WeekColor.Purple:
        bgClass = `bg-purple`;
        break;
      default:
        weekColor satisfies never;
    }

    html.push(`<div data-week="${i}" class="week ${bgClass}"></div>`);
  }

  weeksContainer.innerHTML = html.join("");
}

main();
