import { describe, expect, it, vi } from "vitest";
import {
  clearCommandHandlers,
  registerCommandPaletteOnce,
} from "./commandRegistry";

describe("registerCommandPaletteOnce", () => {
  it("registers a command once and dispatches to the latest handler", () => {
    const host = {};
    const firstHandler = vi.fn();
    const latestHandler = vi.fn();
    const register = vi.fn();
    let action!: () => void;

    register.mockImplementation((registeredAction: () => void) => {
      action = registeredAction;
    });

    expect(
      registerCommandPaletteOnce({
        host,
        pluginId: "_logseq-plugin-tabs-scrollable",
        key: "tabs-close-all",
        register,
        handler: firstHandler,
      })
    ).toBe(true);

    action();
    expect(firstHandler).toHaveBeenCalledTimes(1);

    expect(
      registerCommandPaletteOnce({
        host,
        pluginId: "_logseq-plugin-tabs-scrollable",
        key: "tabs-close-all",
        register,
        handler: latestHandler,
      })
    ).toBe(false);

    action();
    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(latestHandler).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledTimes(1);
  });

  it("keeps handlers isolated by plugin id and clears them on unload", () => {
    const host = {};
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    let firstAction!: () => void;
    let secondAction!: () => void;

    registerCommandPaletteOnce({
      host,
      pluginId: "_logseq-plugin-tabs-scrollable",
      key: "tabs-close-all",
      register: (action: () => void) => {
        firstAction = action;
      },
      handler: firstHandler,
    });

    registerCommandPaletteOnce({
      host,
      pluginId: "_different-plugin",
      key: "tabs-close-all",
      register: (action: () => void) => {
        secondAction = action;
      },
      handler: secondHandler,
    });

    clearCommandHandlers(host, "_logseq-plugin-tabs-scrollable");

    firstAction();
    secondAction();

    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalledTimes(1);
  });
});
