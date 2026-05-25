import { describe, expect, it } from "vitest";

import { getWheelScrollResult } from "./tabStripWheel";

describe("getWheelScrollResult", () => {
  it("uses deltaY when vertical intent is dominant", () => {
    expect(
      getWheelScrollResult({
        scrollLeft: 20,
        clientWidth: 100,
        scrollWidth: 500,
        deltaX: 10,
        deltaY: 30,
        deltaMode: 0,
      })
    ).toEqual({
      nextScrollLeft: 50,
      shouldConsume: true,
    });
  });

  it("uses deltaX when horizontal intent is dominant", () => {
    expect(
      getWheelScrollResult({
        scrollLeft: 100,
        clientWidth: 100,
        scrollWidth: 500,
        deltaX: -40,
        deltaY: 5,
        deltaMode: 0,
      })
    ).toEqual({
      nextScrollLeft: 60,
      shouldConsume: true,
    });
  });

  it("does not consume when there is no overflow", () => {
    expect(
      getWheelScrollResult({
        scrollLeft: 0,
        clientWidth: 200,
        scrollWidth: 200,
        deltaX: 0,
        deltaY: 40,
        deltaMode: 0,
      })
    ).toEqual({
      nextScrollLeft: 0,
      shouldConsume: false,
    });
  });

  it("does not consume when already at the left edge and moving farther left", () => {
    expect(
      getWheelScrollResult({
        scrollLeft: 0,
        clientWidth: 100,
        scrollWidth: 500,
        deltaX: -5,
        deltaY: -30,
        deltaMode: 0,
      })
    ).toEqual({
      nextScrollLeft: 0,
      shouldConsume: false,
    });
  });

  it("clamps and consumes when movement is only partially available", () => {
    expect(
      getWheelScrollResult({
        scrollLeft: 180,
        clientWidth: 100,
        scrollWidth: 300,
        deltaX: 0,
        deltaY: 40,
        deltaMode: 0,
      })
    ).toEqual({
      nextScrollLeft: 200,
      shouldConsume: true,
    });
  });

  it("normalizes line deltas before applying dominant axis rules", () => {
    expect(
      getWheelScrollResult({
        scrollLeft: 10,
        clientWidth: 100,
        scrollWidth: 500,
        deltaX: 1,
        deltaY: 3,
        deltaMode: 1,
      })
    ).toEqual({
      nextScrollLeft: 58,
      shouldConsume: true,
    });
  });

  it("normalizes page deltas using the visible width", () => {
    expect(
      getWheelScrollResult({
        scrollLeft: 50,
        clientWidth: 120,
        scrollWidth: 500,
        deltaX: 1,
        deltaY: 0,
        deltaMode: 2,
      })
    ).toEqual({
      nextScrollLeft: 170,
      shouldConsume: true,
    });
  });
});
