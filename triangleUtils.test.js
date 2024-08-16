const {
  TRIANGLE_HEIGHT,
  constrainToTriangle,
  calculateHeightB,
} = require('./triangleUtils');

describe('Triangle Utilities', () => {
  describe('constrainToTriangle', () => {
    test('point inside triangle', () => {
      expect(constrainToTriangle(0.5, 0.433)).toEqual([0.5, 0.433]);
    });

    test('point outside triangle', () => {
      expect(constrainToTriangle(1.5, 1.5)).toEqual([1, 0]);
    });

    test('point at top vertex', () => {
      expect(constrainToTriangle(0.5, 1)).toEqual([0.5, TRIANGLE_HEIGHT]);
    });

    test('point on left edge', () => {
      expect(constrainToTriangle(-0.5, 0.5)).toEqual([0, 0]);
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
