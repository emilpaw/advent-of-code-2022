import { readLines } from "https://deno.land/std@0.166.0/io/buffer.ts";
import * as m from "https://deno.land/std@0.166.0/collections/mod.ts";

async function readLinesFromFile() {
  const file = await Deno.open("./input.txt");

  const list = [];
  for await (const l of readLines(file)) {
    list.push(l);
  }

  return list;
}

const lines = await readLinesFromFile();

let r = lines
  .reduce(
    (acc, line) => {
      if (line === "") {
        acc.push(0);

        return acc;
      }

      acc[acc.length - 1] += Number(line);

      return acc;
    },
    [0]
  )
  .sort((a, b) => a - b);

let answer = r.pop() + r.pop() + r.pop();

console.log("result", answer);
