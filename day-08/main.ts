import { readInput } from "../utils.ts";

let input = await readInput();

type Tree = {
  height: number;
  scenicScore: number;
};

let r = input
  .map((line) => line.split(""))
  .map((line) =>
    line.map((tree) => ({ height: parseInt(tree), scenicScore: 1 }))
  );

function countVisible(trees: Tree[], tree: Tree): number {
  return trees.reduce(
    (acc, currentTree) => {
      if (acc.stop) {
        return acc;
      }

      let stop = false;

      if (currentTree.height >= tree.height) {
        stop = true;
      }

      return { ...acc, visible: acc.visible + 1, stop };
    },
    { visible: 0, stop: false }
  ).visible;
}

function rowVisibility(input: Tree[][]): Tree[][] {
  return input.map((line) => {
    return line.map((tree, index) => {
      const left = line.slice(0, index).toReversed();
      const visibleFromLeft = countVisible(left, tree);

      const right = line.slice(index + 1);
      const visibleFromRight = countVisible(right, tree);

      return {
        ...tree,
        scenicScore: tree.scenicScore * visibleFromLeft * visibleFromRight,
      };
    });
  });
}

function swapXandY<T>(array: T[][]): T[][] {
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

// swap X and Y so rows become columns
r = swapXandY(r);

// visible vertically
r = rowVisibility(r);

r = r.flat().toSorted((a, b) => b.scenicScore - a.scenicScore)[0].scenicScore;

console.log("r", r);
