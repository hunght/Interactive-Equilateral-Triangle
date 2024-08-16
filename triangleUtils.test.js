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
      expect(calculateHeightB(0.5, TRIANGLE_HEIGHT)).toEqual({
        intersectBx: 0.5,
        intersectBy: TRIANGLE_HEIGHT,
        length: 0,
      });
    });
  });
});
