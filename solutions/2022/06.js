export default function (inputFile) {
  const dataStream = inputFile[0].split("");

  let markerPosition;
  let i = 0;

  while (!markerPosition) {
    if ([...new Set(dataStream.slice(i, i + 4))].length === 4) {
      markerPosition = i + 4;
    }

    i++;
  }

  let messagePosition;
  i = 0;

  while (!messagePosition) {
    if ([...new Set(dataStream.slice(i, i + 14))].length === 14) {
      messagePosition = i + 14;
    }

    i++;
  }

  return {
    1: markerPosition,
    2: messagePosition,
  };
}
