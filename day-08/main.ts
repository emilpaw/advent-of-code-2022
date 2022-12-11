import { readInput } from "../utils.ts";

let input = await readInput();

type Tree = {
  height: number;
  visible: boolean;
};

let r = input
  .map((line) => line.split(""))
  .map((line) =>
    line.map((tree) => ({ height: parseInt(tree), visible: false }))
  );

function rowVisibility(input: Tree[][]) {
  return input.map((line) => {
    return line.map((tree, index) => {
      // visible from left
      if (
        !line
          .slice(0, index)
          .some((currentTree) => currentTree.height >= tree.height)
      ) {
        return { ...tree, visible: true };
      }

      // visible from right
      if (
        !line
          .slice(index + 1)
          .some((currentTree) => currentTree.height >= tree.height)
      ) {
        return { ...tree, visible: true };
      }

      if (tree.visible === true) {
        return tree;
      }

      return { ...tree, visible: false };
    });
  });
}

function swapXandY<T>(array: T[][]) {
  return array.reduce((acc, row, index) => {
    row.forEach((item, index2) => {
      if (!acc[index2]) {
        acc[index2] = [];
      }
      acc[index2][index] = item;
    });
    return acc;
  }, []);
}

// visible horizontally
r = rowVisibility(r);

r.reduce(
  (acc, line) => acc + line.filter((tree) => tree.visible === true).length,
  0
);

// swap X and Y so rows become columns
r = swapXandY(r);

// visible vertically
r = rowVisibility(r);

r = r.reduce(
  (acc, line) => acc + line.filter((tree) => tree.visible === true).length,
  0
);

console.log("r", r);
