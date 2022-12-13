import { sum } from "../../utils/general/array-tools";

export default function (inputFile) {
  const { filesystem } = inputFile.reduce(
    ({ current, filesystem }, command) => {
      // Build a list of file sizes for each directory in the file system

      // First check if the command is to enter a named directory, if it is,
      // the directory is added to the list
      const [dir] = command.match(/(?<=\$ cd )[^\.]+/g) || [];
      if (dir) {
        current = dir === "/" ? "root" : `${current}/${dir}`;
        filesystem[current] = [];
      }

      // If the command is a listed file, add it's size to the list of
      // files within the current directory
      const [file] = command.match(/\d+?(?= .+)/) || [];
      if (file) {
        filesystem[current] = [...filesystem[current], +file];
      }

      // Handles moving back up one level where necessary
      if (/\$ cd \.\./.test(command)) {
        current = current
          .split("/")
          .slice(0, current.match(/\//g).length)
          .join("/");
      }

      return { current, filesystem };
    },
    { filesystem: {} }
  );

  // For the full list of directories in the file system, calculate the total
  // sizes of all files contained within the directory and its sub-directories
  // The dictionary structure using the full path of the directory allows this to be done efficiently
  // as every directory's sub-directories share the same prefix
  const dirList = Object.keys(filesystem);
  const dirSizes = dirList.map((dir) =>
    sum(
      dirList
        .filter((path) => path.startsWith(dir))
        .flatMap((path) => filesystem[path])
    )
  );

  // The target represents the amount of data that requires deletion to allow the update to be installed
  const target = 30000000 - (70000000 - Math.max(...dirSizes));

  return {
    1: sum(dirSizes.filter((size) => size <= 100000)),
    2: Math.min(...dirSizes.filter((size) => size >= target)),
  };
}
