import { readLines } from "https://deno.land/std@0.166.0/io/buffer.ts";

export function readInput() {
  const inputFileName = Deno.args[0];

  if (inputFileName === undefined) {
    throw Error("Input file name not provided");
  }

  return readLinesFromFile(inputFileName);
}

async function readLinesFromFile(filename: string) {
  const file = await Deno.open(filename);

  const list = [];
  for await (const l of readLines(file)) {
    list.push(l);
  }

  return list;
}
