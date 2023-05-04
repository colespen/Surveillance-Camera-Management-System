/**
 * @description: function that compares two frames and return number of different pixels between each
 */
const analysePixelDiff = (
  currentFrame: ImageData,
  previousFrame: ImageData,
  threshold: number,
  diffPixelsCount: number
) => {
  for (let i = 0; i < currentFrame.data.length; i += 8) {
    const r1 = previousFrame.data[i];
    const g1 = previousFrame.data[i + 1];
    const b1 = previousFrame.data[i + 2];

    const r2 = currentFrame.data[i];
    const g2 = currentFrame.data[i + 1];
    const b2 = currentFrame.data[i + 2];
    const pixelSum = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

    if (pixelSum > threshold) {
      diffPixelsCount++;
      currentFrame.data[i] = 0;
      currentFrame.data[i + 1] = 255;
      currentFrame.data[i + 2] = 0;
    }
  }
  return diffPixelsCount;
};

export { analysePixelDiff };
