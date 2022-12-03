import { readLines } from "https://deno.land/std@0.166.0/io/buffer.ts";
import * as m from "https://deno.land/std@0.166.0/collections/mod.ts";
import { assert } from "https://deno.land/std@0.166.0/_util/asserts.ts";

async function readLinesFromFile() {
  const file = await Deno.open("./input.txt");

  const list = [];
  for await (const l of readLines(file)) {
    list.push(l);
  }

  return list;
}

const rucksacks = await readLinesFromFile();

const ASCII_CODE_LOWER_A = 97;
const ASCII_CODE_A = 65;

function points(char: string) {
  if (char >= "a") {
    return char.charCodeAt(0) - ASCII_CODE_LOWER_A + 1;
  }

  return char.charCodeAt(0) - ASCII_CODE_A + 27;
}

let r = rucksacks.map((rucksack) => {
  return [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ];
});

r = r.reduce((acc, curr) => {
  const firstComp = curr[0].split("");
  const secondComp = curr[1].split("");

  const foundDuplicate = firstComp.reduce((acc, char) => {
    if (acc !== null) {
      return acc;
    }

    if (secondComp.includes(char)) {
      return char;
    }

    return null;
  }, null);

  assert(foundDuplicate !== null);

  return [...acc, foundDuplicate];
}, []);

r = r.map(points);

console.log(
  "sum",
  r.reduce((acc, curr) => acc + curr, 0)
);
