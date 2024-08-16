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
      //   expect(calculateHeightB(0, 0)).toEqual({
      //     intersectBx: 0.75,
      //     intersectBy: 0.43301270189221935,
      //     length: TRIANGLE_HEIGHT,
      //   });
      expect(calculateHeightB(0.5, TRIANGLE_HEIGHT)).toEqual({
        intersectBx: 0.5,
        intersectBy: 0,
        length: 0,
      });
    });
  });
});
