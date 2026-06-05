import { afterEach, describe, expect, it } from "vitest";
import {
  getCurrentLocale,
  getLocaleFromUserConfigs,
  normalizeLocale,
  resolveLocaleFromPreferredLanguage,
  setCurrentLocale,
  translationCatalog,
  t,
} from "./i18n";

afterEach(() => {
  setCurrentLocale("en");
});

describe("normalizeLocale", () => {
  it("maps supported locale variants to plugin locales", () => {
    expect(normalizeLocale("fr")).toBe("fr");
    expect(normalizeLocale("fr-FR")).toBe("fr");
    expect(normalizeLocale("de-DE")).toBe("de");
    expect(normalizeLocale("nl-NL")).toBe("nl");
    expect(normalizeLocale("zh-CN")).toBe("zh");
    expect(normalizeLocale("zh-TW")).toBe("zh");
  });

  it("falls back to english for missing or unsupported locales", () => {
    expect(normalizeLocale(undefined)).toBe("en");
    expect(normalizeLocale("")).toBe("en");
    expect(normalizeLocale("es-ES")).toBe("en");
  });
});

describe("resolveLocaleFromPreferredLanguage", () => {
  it("maps preferred language variants to plugin locales", () => {
    expect(resolveLocaleFromPreferredLanguage("de-DE")).toBe("de");
    expect(resolveLocaleFromPreferredLanguage("zh-TW")).toBe("zh");
  });

  it("falls back to english for a missing preferred language", () => {
    expect(resolveLocaleFromPreferredLanguage(undefined)).toBe("en");
  });
});

describe("current locale state", () => {
  it("defaults to english", () => {
    expect(getCurrentLocale()).toBe("en");
  });

  it("updates the current locale from resolved user configs", async () => {
    const locale = await getLocaleFromUserConfigs({ preferredLanguage: "fr-FR" });

    setCurrentLocale(locale);

    expect(getCurrentLocale()).toBe("fr");
  });

  it("uses the active locale when no locale override is provided", () => {
    setCurrentLocale("fr");

    expect(t("tabs.closeAll")).toBe("Tout fermer");
  });
});

describe("getLocaleFromUserConfigs", () => {
  it("resolves the normalized locale from preferredLanguage", async () => {
    await expect(
      getLocaleFromUserConfigs({ preferredLanguage: "fr-FR" })
    ).resolves.toBe("fr");
  });

  it("falls back to english when preferredLanguage is missing", async () => {
    await expect(getLocaleFromUserConfigs({})).resolves.toBe("en");
  });
});

describe("t", () => {
  it("returns translated strings for supported locales", () => {
    expect(t("tooltip.createNewPage", { locale: "fr" })).toBe(
      "Créer une nouvelle page"
    );
    expect(t("tooltip.createNewPage", { locale: "de" })).toBe(
      "Neue Seite erstellen"
    );
    expect(t("tabs.closeAll", { locale: "fr" })).toBe("Tout fermer");
    expect(t("tabs.closeAll", { locale: "de" })).toBe("Alle schließen");
    expect(t("commands.closeAll", { locale: "nl" })).toBe(
      "Alle tabbladen sluiten"
    );
    expect(t("commands.closeOthers", { locale: "nl" })).toBe(
      "Andere tabbladen sluiten"
    );
    expect(t("commands.selectTab", { locale: "en", params: { index: 5 } })).toBe(
      "Select tab 5"
    );
    expect(t("commands.selectTab", { locale: "fr", params: { index: 2 } })).toBe(
      "Sélectionner l'onglet 2"
    );
    expect(t("commands.selectTab", { locale: "de", params: { index: 4 } })).toBe(
      "Tab 4 auswählen"
    );
    expect(t("commands.selectTab", { locale: "zh", params: { index: 3 } })).toBe(
      "选择标签页 3"
    );
  });

  it("falls back to english when locale or translation is missing", () => {
    expect(t("tabs.closeAll")).toBe("Close All");
  });

  it("avoids malformed select-tab labels when index is missing", () => {
    expect(t("commands.selectTab")).toBe("Select tab");
  });

  it("returns settings translations for supported locales", () => {
    expect(t("settings.showSingleTab.title", { locale: "fr" })).toBe(
      "Afficher un seul onglet ?"
    );
    expect(
      t("settings.hideCloseAllButton.description", { locale: "de" })
    ).toContain("Schaltfläche");
    expect(t("tabs.closeAll", { locale: "zh" })).toBe("关闭全部");
    expect(
      t("settings.keybindingDescription", {
        locale: "nl",
        params: { label: "Tab sluiten", binding: "mod+shift+w" },
      })
    ).toContain("Start Logseq opnieuw om deze wijziging toe te passen.");
    expect(
      t("settings.keybindingDescriptionWithoutBinding", {
        locale: "en",
        params: { label: "Toggle pin" },
      })
    ).toBe("Toggle pin. Restart Logseq to apply this change.");
    expect(
      t("settings.keybindingDescriptionWithoutBinding", {
        locale: "de",
        params: { label: "Anheften umschalten" },
      })
    ).toBe("Anheften umschalten. Starte Logseq neu, um diese Änderung anzuwenden.");
  });

  it("defines every translation key in every supported locale", () => {
    const expectedKeys = Object.keys(translationCatalog.en).sort();

    for (const locale of Object.keys(translationCatalog)) {
      const localeCatalog =
        translationCatalog[locale as keyof typeof translationCatalog];

      expect(Object.keys(localeCatalog).sort()).toEqual(expectedKeys);
      expect(localeCatalog["commands.selectTab"]).toContain("{index}");
      expect(localeCatalog["settings.keybindingDescription"]).toContain("{label}");
      expect(localeCatalog["settings.keybindingDescription"]).toContain("{binding}");
      expect(localeCatalog["settings.keybindingDescriptionWithoutBinding"]).toContain(
        "{label}"
      );
    }
  });
});
