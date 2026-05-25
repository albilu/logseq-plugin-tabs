export type WheelScrollInput = {
  scrollLeft: number;
  clientWidth: number;
  scrollWidth: number;
  deltaX: number;
  deltaY: number;
  deltaMode: number;
};

export type WheelScrollResult = {
  nextScrollLeft: number;
  shouldConsume: boolean;
};

const LINE_DELTA_PX = 16;

function normalizeDelta(delta: number, deltaMode: number, clientWidth: number): number {
  if (deltaMode === 1) {
    return delta * LINE_DELTA_PX;
  }

  if (deltaMode === 2) {
    return delta * clientWidth;
  }

  return delta;
}

export function getWheelScrollResult(input: WheelScrollInput): WheelScrollResult {
  const maxScrollLeft = Math.max(0, input.scrollWidth - input.clientWidth);

  if (maxScrollLeft === 0) {
    return {
      nextScrollLeft: input.scrollLeft,
      shouldConsume: false,
    };
  }

  const normalizedDeltaX = normalizeDelta(input.deltaX, input.deltaMode, input.clientWidth);
  const normalizedDeltaY = normalizeDelta(input.deltaY, input.deltaMode, input.clientWidth);
  const movement =
    Math.abs(normalizedDeltaY) > Math.abs(normalizedDeltaX)
      ? normalizedDeltaY
      : normalizedDeltaX;

  const nextScrollLeft = Math.min(
    maxScrollLeft,
    Math.max(0, input.scrollLeft + movement)
  );

  return {
    nextScrollLeft,
    shouldConsume: nextScrollLeft !== input.scrollLeft,
  };
}
