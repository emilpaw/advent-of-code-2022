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

let r = await readLinesFromFile();

function parseRange(range: string) {
  return range.split("-").map((n) => parseInt(n, 10));
}

r = r.map((l) => l.split(",").map(parseRange));

r = r.map((l) => {
  const first = l[0];
  const second = l[1];

  if (second[0] <= first[1] && second[1] >= first[0]) {
    return true;
  }

  return false;
});

console.log("r", r);

r = r.reduce((acc, curr) => acc + (curr ? 1 : 0), 0);

console.log("r", r);
