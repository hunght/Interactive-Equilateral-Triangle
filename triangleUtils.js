// Define the constant for triangle height
const TRIANGLE_HEIGHT = 0.866;

function constrainToTriangle(x, y) {
  // Constrain x to [0, 1]
  x = Math.max(0, Math.min(1, x));

  // Calculate the maximum allowed y for the given x
  const maxY = TRIANGLE_HEIGHT * (1 - Math.abs(2 * x - 1));

  // Constrain y to [0, maxY]
  y = Math.max(0, Math.min(maxY, y));

  return [x, y];
}

function calculateHeightB(x, y) {
  const intersectBx = 1 - (TRIANGLE_HEIGHT - y) / Math.sqrt(3);
  const intersectBy = TRIANGLE_HEIGHT;
  return {
    intersectBx,
    intersectBy,
    length: Math.sqrt(
      Math.pow(x - intersectBx, 2) + Math.pow(y - intersectBy, 2)
    ),
  };
}

module.exports = {
  TRIANGLE_HEIGHT,
  constrainToTriangle,
  calculateHeightB,
};
