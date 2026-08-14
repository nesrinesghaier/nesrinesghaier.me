/* global describe, it, expect, beforeEach */

import setStyle from "../../src/scrollytelly/setStyle";

describe("setStyle", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("sets a simple camelCase-able property", () => {
    setStyle(el, "opacity", "0.5");
    expect(el.style.opacity).toEqual("0.5");
  });

  it("converts kebab-case props to camelCase", () => {
    setStyle(el, "background-color", "red");
    expect(el.style.backgroundColor).toEqual("red");
  });

  it("stringifies numeric z-index values", () => {
    setStyle(el, "z-index", 5);
    expect(el.style.zIndex).toEqual("5");
  });

  it("passes through non-numeric z-index values like 'auto'", () => {
    setStyle(el, "z-index", "auto");
    expect(el.style.zIndex).toEqual("auto");
  });

  it("sets cssFloat for the float property", () => {
    setStyle(el, "float", "left");
    expect(el.style.cssFloat).toEqual("left");
  });
});
