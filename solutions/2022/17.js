import { TetrisCave } from '../../utils/2022/tetris-rocks';

export default function (inputFile) {
  const cave = new TetrisCave(7, inputFile);

  for (let i = 0; i < 2022; i++) {
    cave.dropRock();
  }

  //   const cave2 = new TetrisCave(7, inputFile);

  //   for (let i = 0; i < 1000000000000; i++) {
  //     cave2.dropRock();
  //   }

  return {
    1: cave.height,
    2: null,
  };
}
