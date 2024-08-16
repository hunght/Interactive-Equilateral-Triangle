// Constants
const TRIANGLE_HEIGHT = 0.866;

// Function to calculate height B
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

describe('Height B calculations', () => {
  test('Height B at triangle center', () => {
    const result = calculateHeightB(0.5, TRIANGLE_HEIGHT / 2);
    expect(result.intersectBx).toBeCloseTo(0.75, 4);
    expect(result.intersectBy).toBeCloseTo(TRIANGLE_HEIGHT, 5);
    expect(result.length).toBeCloseTo(0.25, 5);
  });

  test('Height B at top vertex', () => {
    const result = calculateHeightB(0.5, TRIANGLE_HEIGHT);
    expect(result.intersectBx).toBeCloseTo(1, 5);
    expect(result.intersectBy).toBeCloseTo(TRIANGLE_HEIGHT, 5);
    expect(result.length).toBeCloseTo(0.5, 5);
  });

  test('Height B at bottom-right vertex', () => {
    const result = calculateHeightB(1, 0);
    expect(result.intersectBx).toBeCloseTo(0.5, 4);
    expect(result.intersectBy).toBeCloseTo(TRIANGLE_HEIGHT, 5);
    expect(result.length).toBeCloseTo(TRIANGLE_HEIGHT, 5);
  });

  test('Height B at a random point', () => {
    const result = calculateHeightB(0.7, 0.4);
    expect(result.intersectBx).toBeCloseTo(0.7321, 3);
    expect(result.intersectBy).toBeCloseTo(TRIANGLE_HEIGHT, 4);
    expect(result.length).toBeCloseTo(0.466, 3);
  });
});
