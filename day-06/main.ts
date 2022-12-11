import * as mod from "https://deno.land/std@0.166.0/collections/mod.ts";

import { readInput } from "../utils.ts";

let input = await readInput();

console.log("input", input);

let r = input[0].split("").map((value, index) => [value, index + 1]);

r = mod.slidingWindows(r, 4).reduce((acc, curr) => {
  const values = curr.map((value) => value[0]);

  if (acc !== undefined) {
    return acc;
  }

  if (mod.distinct(values).length === values.length) {
    return curr;
  }
}, undefined);

console.log("r", r[3][1]);
