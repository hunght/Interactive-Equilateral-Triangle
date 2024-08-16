const {
  TRIANGLE_HEIGHT,
  constrainToTriangle,
  calculateHeightB,
} = require('./triangleUtils');

describe('Triangle Utilities', () => {
  describe('constrainToTriangle', () => {
    test('point on left edge', () => {
      expect(constrainToTriangle(0, 0)).toEqual([0, TRIANGLE_HEIGHT]);
    });
    test('point on left edge', () => {
      expect(constrainToTriangle(0, TRIANGLE_HEIGHT)).toEqual([0, 0]);
    });
  });

  describe('calculateHeightB', () => {
    test('from center of triangle', () => {
      expect(calculateHeightB(0.5, TRIANGLE_HEIGHT)).toEqual({
        intersectBx: 0.5,
        intersectBy: TRIANGLE_HEIGHT,
        length: 0,
      });
      expect(calculateHeightB(0, 0)).toEqual({
        intersectBx: 0.5,
        intersectBy: TRIANGLE_HEIGHT,
        length: TRIANGLE_HEIGHT,
      });
    });
  });
});
