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

const win = {
  A: "Y",
  B: "Z",
  C: "X",
};

const draw = {
  A: "X",
  B: "Y",
  C: "Z",
};

const scoreForShape = {
  X: 1,
  Y: 2,
  Z: 3,
};

const points = {
  win: 6,
  draw: 3,
  lost: 0,
};

let r = lines.map((line) => line.split(" "));

console.log("r", r);

r = r.map((line) => {
  const enemy = line[0];
  const me = line[1];

  if (win[enemy] === me) {
    return points["win"] + scoreForShape[me];
  }

  if (draw[enemy] === me) {
    return points["draw"] + scoreForShape[me];
  }

  return points["lost"] + scoreForShape[me];
});

console.log("r", r);

r = r.reduce((acc, cur) => acc + cur, 0);

console.log("r", r);
