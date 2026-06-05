import { beforeEach, describe, expect, it, vi } from "vitest";

const getLocaleFromUserConfigsMock = vi.fn();
const setCurrentLocaleMock = vi.fn();
const buildSettingsMock = vi.fn();

vi.mock("@logseq/libs", () => ({}));
vi.mock("virtual:windi.css", () => ({}));
vi.mock("./reset.css", () => ({}));
vi.mock("./App", () => ({
  default: () => null,
}));

vi.mock("./i18n", () => ({
  getLocaleFromUserConfigs: getLocaleFromUserConfigsMock,
  setCurrentLocale: setCurrentLocaleMock,
}));

vi.mock("./settings", () => ({
  buildSettings: buildSettingsMock,
}));

describe("bootstrapLocaleSettings", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    (globalThis as typeof globalThis & { logseq?: unknown }).logseq = {
      ready: vi.fn(() => ({
        catch: vi.fn(),
      })),
      App: {
        getUserConfigs: vi.fn(),
      },
      useSettingsSchema: vi.fn(),
    };
  });

  it("registers french settings from preferredLanguage and stores the locale", async () => {
    const userConfigs = { preferredLanguage: "fr-FR" };
    const schema = [{ key: "tabs:show-single-tab" }];
    const logseqMock = globalThis.logseq as {
      App: { getUserConfigs: ReturnType<typeof vi.fn> };
      useSettingsSchema: ReturnType<typeof vi.fn>;
    };

    logseqMock.App.getUserConfigs.mockResolvedValue(userConfigs);
    getLocaleFromUserConfigsMock.mockResolvedValue("fr");
    buildSettingsMock.mockReturnValue(schema);

    const { bootstrapLocaleSettings } = await import("./main");

    await expect(bootstrapLocaleSettings()).resolves.toBe("fr");
    expect(logseqMock.App.getUserConfigs).toHaveBeenCalledTimes(1);
    expect(getLocaleFromUserConfigsMock).toHaveBeenCalledWith(userConfigs);
    expect(setCurrentLocaleMock).toHaveBeenCalledWith("fr");
    expect(buildSettingsMock).toHaveBeenCalledWith("fr");
    expect(logseqMock.useSettingsSchema).toHaveBeenCalledWith(schema);
  });

  it("falls back to english settings when getUserConfigs rejects", async () => {
    const schema = [{ key: "tabs:hide-close-all-button" }];
    const logseqMock = globalThis.logseq as {
      App: { getUserConfigs: ReturnType<typeof vi.fn> };
      useSettingsSchema: ReturnType<typeof vi.fn>;
    };

    logseqMock.App.getUserConfigs.mockRejectedValue(new Error("boom"));
    getLocaleFromUserConfigsMock.mockResolvedValue("en");
    buildSettingsMock.mockReturnValue(schema);

    const { bootstrapLocaleSettings } = await import("./main");

    await expect(bootstrapLocaleSettings()).resolves.toBe("en");
    expect(getLocaleFromUserConfigsMock).toHaveBeenCalledWith(undefined);
    expect(setCurrentLocaleMock).toHaveBeenCalledWith("en");
    expect(buildSettingsMock).toHaveBeenCalledWith("en");
    expect(logseqMock.useSettingsSchema).toHaveBeenCalledWith(schema);
  });
});
