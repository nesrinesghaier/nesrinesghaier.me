/* global describe, it, expect */

import calcInterpolation from "../../src/scrollytelly/calcInterpolation";

describe("calcInterpolation", () => {
  it("leaves index 0 untouched (the format string slot)", () => {
    const result = calcInterpolation(["px({?})", 0], ["px({?})", 100], 0.5);
    expect(result[0]).toEqual("px({?})");
  });

  it("interpolates numeric values by progress", () => {
    const result = calcInterpolation(["{?}", 0], ["{?}", 100], 0.5);
    expect(result[1]).toEqual(50);
  });

  it("returns the start value at progress 0", () => {
    const result = calcInterpolation(["{?}", 10], ["{?}", 20], 0);
    expect(result[1]).toEqual(10);
  });

  it("returns the end value at progress 1", () => {
    const result = calcInterpolation(["{?}", 10], ["{?}", 20], 1);
    expect(result[1]).toEqual(20);
  });

  it("interpolates multiple numeric slots independently", () => {
    const result = calcInterpolation(
      ["{?} {?}", 0, 100],
      ["{?} {?}", 10, 200],
      0.5
    );
    expect(result).toEqual(["{?} {?}", 5, 150]);
  });
});
