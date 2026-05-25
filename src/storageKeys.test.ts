import { describe, expect, it } from "vitest";

import { getStorageKeyId } from "./storageKeys";

describe("getStorageKeyId", () => {
  it("uses the current plugin id when available", () => {
    (globalThis as any).logseq = {
      baseInfo: {
        id: "tabs-scrollable-fork",
      },
    };

    expect(getStorageKeyId("graph-path")).toBe(
      "tabs-scrollable-fork:1.0.0/graph-path"
    );
  });

  it("falls back to the manifest plugin id when runtime plugin id is unavailable", () => {
    (globalThis as any).logseq = {
      baseInfo: {},
    };

    expect(getStorageKeyId("graph-path")).toBe(
      "_pengx17-logseq-tabs:1.0.0/graph-path"
    );
  });
});
