// Define the constant for triangle height
const TRIANGLE_HEIGHT = 0.866;

function constrainToTriangle(x, y) {
  if (y > Math.sqrt(3) * (0.5 - Math.abs(x - 0.5))) {
    y = Math.sqrt(3) * (0.5 - Math.abs(x - 0.5));
  }
  if (x < 0) x = 0;
  if (x > 1) x = 1;
  if (y < 0) y = 0;
  if (y > TRIANGLE_HEIGHT) y = TRIANGLE_HEIGHT;
  return [x, y];
}

function getBarycentricCoordinates(x, y) {
  const a = 1 - x - y / Math.sqrt(3);
  const b = x - y / Math.sqrt(3);
  const c = (2 * y) / Math.sqrt(3);
  return [a, b, c].map((v) => Math.max(0, Math.min(1, v)));
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
  getBarycentricCoordinates,
  calculateHeightB,
};
