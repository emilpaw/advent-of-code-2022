import { readInput } from "../utils.ts";

let input = await readInput();

type RootNode = {
  type: "root";
  contents: Nodes[];
  size: number;
  name: "/";
};

// all nodes
type Nodes = File | Directory | RootNode;

// all nodes which have contents
type DirNode = RootNode | Directory;

type Node = {
  parent: DirNode;
};

type File = {
  type: "file";
  name: string;
  size: number;
} & Node;

type Directory = {
  size: number;
  type: "dir";
  name: string;
  contents: Nodes[];
} & Node;

const root = {
  contents: [],
  type: "root",
  name: "/",
  size: 0,
} as RootNode;

let current: RootNode | Directory = root;

function isDirectory(node: Nodes): node is Directory {
  return node.type === "dir";
}

function isFile(node: Nodes): node is File {
  return node.type === "file";
}

input
  .map((line) => line.split(" "))
  .forEach((input) => {
    // command
    if (input[0] === "$") {
      const cmd = input[1];
      const arg = input[2];

      if (cmd === "cd") {
        if (arg === "/") {
          current = root;
        } else if (arg === "..") {
          current = current.parent;
        } else {
          // change directory

          const childDirs = current.contents.filter(isDirectory);

          const foundChildDir = childDirs.find((dir) => dir.name === arg);

          // create the child directory if it does not exist yet
          if (!foundChildDir) {
            const newDir = {
              type: "dir" as const,
              name: arg,
              contents: [],
              parent: current,
              size: 0,
            };
            current.contents.push(newDir);
            current = newDir;
          } else {
            current = foundChildDir;
          }
        }
      }

      return;
    }

    // directory
    if (input[0] === "dir") {
      current.contents.push({
        type: "dir",
        name: input[1],
        contents: [],
        parent: current,
        size: 0,
      });

      return;
    }

    // file
    current.contents.push({
      type: "file",
      name: input[1],
      size: parseInt(input[0]),
      parent: current,
    });
  });

printTree(root);

function calculateSize(node: DirNode): number {
  const files = node.contents.filter((node) => isFile(node));
  const totalFilesSizes = files
    .map((file) => file.size)
    .reduce((prev, curr) => prev + curr, 0);

  const dirs = node.contents.filter((node) => isDirectory(node));
  const totalDirSizes = dirs
    .map((dir) => calculateSize(dir))
    .reduce((prev, curr) => prev + curr, 0);

  const sum = totalDirSizes + totalFilesSizes;

  node.size = sum;

  return sum;
}

calculateSize(root);

function printTree(node: DirNode, depth = 0) {
  console.log(`${"  ".repeat(depth)}- ${node.name} (dir)`);

  const dirs = node.contents.filter((node): node is Directory =>
    isDirectory(node)
  );

  dirs.forEach((dir) => {
    printTree(dir, depth + 1);
  });

  const files = node.contents.filter((node): node is File => isFile(node));

  files.forEach((file) => {
    console.log(
      `${"  ".repeat(depth + 1)}- ${file.name} (file, size=${file.size})`
    );
  });
}

printTree(root);

const allDirectories: Directory[] = [];
function findDirectories(node: DirNode) {
  const dirs = node.contents.filter((node): node is Directory =>
    isDirectory(node)
  );

  allDirectories.push(...dirs);

  dirs.forEach((dir) => findDirectories(dir));
}

findDirectories(root);

let r = allDirectories
  .filter((dir) => dir.size <= 100000)
  .reduce((prev, curr) => prev + curr.size, 0);

console.log("r", r);
