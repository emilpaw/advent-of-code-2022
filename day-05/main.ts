import { readLines } from "https://deno.land/std@0.166.0/io/buffer.ts";
import * as mod from "https://deno.land/std@0.166.0/collections/mod.ts";

async function readLinesFromFile() {
  const file = await Deno.open("./input.txt");

  const list = [];
  for await (const l of readLines(file)) {
    list.push(l);
  }

  return list;
}

let allLines = await readLinesFromFile();

console.log("allLines", allLines);

let emptyLineIndex = allLines.findIndex((l) => l === "");

let stacks = allLines.slice(0, emptyLineIndex - 1).map((l) => l.split(""));

let numberLine = allLines[emptyLineIndex - 1].split("");

let indicesOfNumbers: string[] = numberLine.reduce((acc, curr, _, arr) => {
  if (curr === " ") {
    return acc;
  }

  return [...acc, arr.findIndex((n) => n === curr)];
}, [] as string[]);

/*
s will look like this:
{
  1: [Z, N],
  2: [M, C, D],
  3: [P],
}
 */
type Stack = {
  [pos: number]: string[];
};

let s = stacks.reduceRight((acc, curr, _, arr) => {
  indicesOfNumbers.map((n, index) => {
    if (curr[n] === " " || curr[n] === "[" || curr[n] == "]") {
      return;
    }

    const pos = index + 1;

    if (acc[pos] === undefined) {
      acc[pos] = [];
    }

    acc[pos].push(curr[n]);
  });

  return acc;
}, {} as Stack);

console.log("Indizes of numbers:", indicesOfNumbers);

let arrangements = allLines.slice(emptyLineIndex + 1).map((a) => {
  let parts = a.split(" ");

  return {
    amount: parseInt(parts[1]),
    from: parseInt(parts[3]),
    to: parseInt(parts[5]),
  };
});

s = arrangements.reduce((stacks, curr) => {
  const fromStack = stacks[curr.from];
  const toStack = stacks[curr.to];

  console.log(
    `\n\nMoving ${curr.amount} crates from stack with pos ${curr.from} to stack with pos ${curr.to}`
  );

  console.log(`Before moving the stacks looks like:`);
  console.log(stacks);

  const crates: string[] = fromStack.slice(fromStack.length - curr.amount);

  const newStackState = {
    ...stacks,
    [curr.from]: fromStack.slice(0, fromStack.length - curr.amount),
    [curr.to]: [...toStack, ...crates.toReversed()],
  };

  console.log(`After moving the stacks looks like:`);
  console.log(newStackState);

  return newStackState;
}, s);

const result = Object.keys(s)
  .toSorted()
  .map((pos) => s[pos].pop())
  .join("");

console.log("result", result);
