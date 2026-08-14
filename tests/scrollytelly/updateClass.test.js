/* global describe, it, expect, beforeEach */

import updateClass from "../../src/scrollytelly/updateClass";

describe("updateClass", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("overwrites the classes when remove is omitted", () => {
    el.className = "foo bar";
    updateClass(el, "baz");
    expect(el.className).toEqual("baz");
  });

  it("adds classes that are not already present", () => {
    el.className = "foo";
    updateClass(el, ["bar"], []);
    expect(el.className).toEqual("foo bar");
  });

  it("does not duplicate a class that is already present", () => {
    el.className = "foo bar";
    updateClass(el, ["bar"], []);
    expect(el.className).toEqual("foo bar");
  });

  it("removes the given classes", () => {
    el.className = "foo bar baz";
    updateClass(el, [], ["bar"]);
    expect(el.className).toEqual("foo baz");
  });

  it("adds and removes classes in the same call", () => {
    el.className = "foo bar";
    updateClass(el, ["baz"], ["bar"]);
    expect(el.className).toEqual("foo baz");
  });
});
