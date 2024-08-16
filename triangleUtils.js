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
  if (y === 0) {
    // Top of the triangle in SVG coordinates
    return {
      intersectBx: x,
      intersectBy: 0,
      length: 0,
    };
  }

  // Constants
  const ANGLE_RAD = Math.PI / 6; // 30 degrees in radians

  // Calculate the differences using trigonometric relations
  // Note: We negate dy for SVG coordinates
  const dx = Math.cos(ANGLE_RAD);
  const dy = -Math.sin(ANGLE_RAD); // Negated for SVG

  // Calculate intersection points
  const intersectBx = x + dx;
  const intersectBy = y + dy;

  // Calculate length
  const length = Math.sqrt(dx * dx + dy * dy);

  return {
    intersectBx,
    intersectBy,
    length,
  };
}

module.exports = {
  TRIANGLE_HEIGHT,
  constrainToTriangle,
  calculateHeightB,
};
