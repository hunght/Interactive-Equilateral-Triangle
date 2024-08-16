const {
  TRIANGLE_HEIGHT,
  constrainToTriangle,
  getBarycentricCoordinates,
  calculateHeightB,
} = require('./triangleUtils');

describe('Triangle Utilities', () => {
  test('TRIANGLE_HEIGHT constant', () => {
    expect(TRIANGLE_HEIGHT).toBeCloseTo(0.866, 3);
  });

  describe('constrainToTriangle', () => {
    test('point inside triangle', () => {
      expect(constrainToTriangle(0.5, 0.433)).toEqual([0.5, 0.433]);
    });

    test('point outside triangle', () => {
      expect(constrainToTriangle(1.5, 1.5)).toEqual([1, TRIANGLE_HEIGHT]);
    });
  });

  describe('getBarycentricCoordinates', () => {
    test('center of triangle', () => {
      const [a, b, c] = getBarycentricCoordinates(0.5, TRIANGLE_HEIGHT / 2);
      expect(a).toBeCloseTo(1 / 3, 2);
      expect(b).toBeCloseTo(1 / 3, 2);
      expect(c).toBeCloseTo(1 / 3, 2);
    });
  });

  describe('calculateHeightB', () => {
    test('from center of triangle', () => {
      const result = calculateHeightB(0.5, TRIANGLE_HEIGHT / 2);
      expect(result.intersectBx).toBeCloseTo(1, 2);
      expect(result.intersectBy).toBeCloseTo(TRIANGLE_HEIGHT, 2);
      expect(result.length).toBeCloseTo(0.5, 2);
    });
  });
});
