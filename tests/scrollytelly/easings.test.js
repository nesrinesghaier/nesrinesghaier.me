/* global describe, it, expect */

import easings from "../../src/scrollytelly/easings";

describe("easings", () => {
  it("begin always returns 0", () => {
    expect(easings.begin(0)).toEqual(0);
    expect(easings.begin(0.5)).toEqual(0);
    expect(easings.begin(1)).toEqual(0);
  });

  it("end always returns 1", () => {
    expect(easings.end(0)).toEqual(1);
    expect(easings.end(0.5)).toEqual(1);
    expect(easings.end(1)).toEqual(1);
  });

  it("linear returns progress unchanged", () => {
    expect(easings.linear(0.3)).toEqual(0.3);
  });

  it("quadratic squares progress", () => {
    expect(easings.quadratic(0.5)).toEqual(0.25);
  });

  it("cubic cubes progress", () => {
    expect(easings.cubic(0.5)).toEqual(0.125);
  });

  it("sqrt takes the square root of progress", () => {
    expect(easings.sqrt(0.25)).toEqual(0.5);
  });

  it.each(["linear", "quadratic", "cubic", "swing", "sqrt", "outCubic", "bounce"])(
    "%s goes from 0 at progress 0 to 1 at progress 1",
    (name) => {
      expect(easings[name](0)).toBeCloseTo(0, 5);
      expect(easings[name](1)).toBeCloseTo(1, 5);
    }
  );
});
