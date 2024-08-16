// Define the constant for triangle height
const TRIANGLE_HEIGHT = Math.sin(Math.PI / 3); // sin(60)

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
  // Constants
  const ANGLE_RAD = Math.PI / 6; // 30 degrees in radians
  const opposite = y;
  const adjacent = opposite / Math.tan(ANGLE_RAD);
  const hypotenuseBigTriangle = 1 - (x - adjacent);
  const oppositeBigTriangle = Math.sin(ANGLE_RAD) * hypotenuseBigTriangle;

  const intersectBx = 1 - Math.cos(Math.PI / 3) * oppositeBigTriangle;
  const intersectBy =
    TRIANGLE_HEIGHT - Math.sin(Math.PI / 3) * oppositeBigTriangle;
  const length = Math.sqrt(
    (intersectBx - x) ** 2 +
      (Math.sin(Math.PI / 3) * oppositeBigTriangle - y) ** 2
  );

  // Round values for debugging
  const roundToFourDecimals = (num) => Math.round(num * 10000) / 10000;

  return {
    intersectBx: roundToFourDecimals(intersectBx),
    intersectBy: roundToFourDecimals(intersectBy),
    length: roundToFourDecimals(length),
  };
}

module.exports = {
  TRIANGLE_HEIGHT,
  constrainToTriangle,
  calculateHeightB,
};
