/* global describe, it, expect */

import parseProp from "../../src/scrollytelly/parseProp";

describe("parseProp", () => {
  it("replaces a single number with a placeholder and extracts it", () => {
    expect(parseProp("10px")).toEqual(["{?}px", 10]);
  });

  it("extracts multiple numbers in order", () => {
    expect(parseProp("translate(10px, 20px)")).toEqual([
      "translate({?}px, {?}px)",
      10,
      20,
    ]);
  });

  it("handles negative and decimal numbers", () => {
    expect(parseProp("-1.5em")).toEqual(["{?}em", -1.5]);
  });

  it("returns just the format string when there are no numbers", () => {
    expect(parseProp("none")).toEqual(["none"]);
  });
});
