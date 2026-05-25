import { describe, expect, it, vi } from "vitest";

import { attachNonPassiveWheelListener } from "./wheelListener";

describe("attachNonPassiveWheelListener", () => {
  it("registers the wheel listener with passive false and removes it on cleanup", () => {
    const listener = vi.fn();
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const element = {
      addEventListener,
      removeEventListener,
    } as unknown as HTMLDivElement;

    const detach = attachNonPassiveWheelListener(element, listener);

    expect(addEventListener).toHaveBeenCalledWith("wheel", expect.any(Function), {
      passive: false,
    });

    const nativeListener = addEventListener.mock.calls[0][1] as EventListener;
    nativeListener({ type: "wheel", deltaY: 15 } as unknown as Event);

    expect(listener).toHaveBeenCalledTimes(1);

    detach();

    expect(removeEventListener).toHaveBeenCalledWith("wheel", nativeListener);
  });
});
