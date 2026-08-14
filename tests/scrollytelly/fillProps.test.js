/* global describe, it, expect */

import fillProps from "../../src/scrollytelly/fillProps";

describe("fillProps", () => {
  it("fills a missing prop in a middle frame from its left neighbor", () => {
    const scrollable = {
      keyFrames: [
        { props: { opacity: "0" } },
        { props: {} },
        { props: { opacity: "1" } },
      ],
    };

    fillProps(scrollable);

    expect(scrollable.keyFrames[1].props.opacity).toEqual("0");
  });

  it("fills a leading frame missing a prop from a later frame", () => {
    const scrollable = {
      keyFrames: [{ props: {} }, { props: { opacity: "1" } }],
    };

    fillProps(scrollable);

    expect(scrollable.keyFrames[0].props.opacity).toEqual("1");
  });

  it("leaves frames that already define the prop untouched", () => {
    const scrollable = {
      keyFrames: [
        { props: { opacity: "0" } },
        { props: { opacity: "0.5" } },
        { props: { opacity: "1" } },
      ],
    };

    fillProps(scrollable);

    expect(scrollable.keyFrames.map((f) => f.props.opacity)).toEqual([
      "0",
      "0.5",
      "1",
    ]);
  });
});
