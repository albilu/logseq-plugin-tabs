import { describe, expect, it } from "vitest";
import * as settingsModule from "./settings";
import { buildSettings, keyBindings } from "./settings";

describe("buildSettings", () => {
  it("returns localized settings content for french", () => {
    const settings = buildSettings("fr");

    expect(settings).toHaveLength(8);
    expect(
      settings.find((setting) => setting.key === "tabs:inherit-custom-css")
    ).toMatchObject({
      key: "tabs:inherit-custom-css",
      type: "boolean",
      default: false,
      title: "Hériter de custom.css ?",
      description:
        "Appliquer au plugin d'onglets les styles du fichier custom.css de votre graphe.",
    });
    expect(
      settings.find((setting) => setting.key === "tabs:show-single-tab")?.title
    ).toBe("Afficher un seul onglet ?");
    expect(
      settings.find((setting) => setting.key === "tabs:show-single-tab")
    ).toMatchObject({
      description:
        "Garder la barre d'onglets visible même lorsqu'un seul onglet est ouvert.",
      type: "boolean",
      default: true,
    });
    expect(
      settings.find((setting) => setting.key === "tabs:close-button-left")
    ).toMatchObject({
      title: "Placer le bouton de fermeture à gauche ?",
      description:
        "Afficher le bouton de fermeture de chaque onglet avant le titre.",
      type: "boolean",
      default: false,
    });
    expect(
      settings.find((setting) => setting.key === "tabs:hide-close-all-button")
    ).toMatchObject({
      title: "Masquer le bouton Tout fermer ?",
      description: 'Masquer le bouton "Tout fermer" dans la barre d\'onglets.',
      type: "boolean",
      default: false,
    });
  });

  it("preserves keys and defaults for german", () => {
    const settings = buildSettings("de");

    expect(
      settings.find((setting) => setting.key === "tabs:close")?.default
    ).toBe("mod+shift+w");
    expect(
      settings.find((setting) => setting.key === "tabs:hide-close-all-button")
        ?.default
    ).toBe(false);
    expect(settings.map((setting) => setting.key)).toEqual([
      "tabs:toggle-pin",
      "tabs:close",
      "tabs:select-next",
      "tabs:select-prev",
      "tabs:inherit-custom-css",
      "tabs:show-single-tab",
      "tabs:close-button-left",
      "tabs:hide-close-all-button",
    ]);
    expect(settings.find((setting) => setting.key === "tabs:toggle-pin")).toMatchObject({
      type: "string",
      default: "",
      title: "Anheften umschalten",
      description:
        "Anheften umschalten. Starte Logseq neu, um diese Änderung anzuwenden.",
    });
    expect(settings.find((setting) => setting.key === "tabs:close")).toMatchObject({
      type: "string",
      title: "Tab schließen",
      description:
        "Tab schließen: mod+shift+w. Starte Logseq neu, um diese Änderung anzuwenden.",
    });
    expect(
      settings.find((setting) => setting.key === "tabs:hide-close-all-button")
    ).toMatchObject({
      title: "Alle-schließen-Schaltfläche ausblenden?",
      description: 'Die "Alle schließen"-Schaltfläche in der Tableiste ausblenden.',
    });
  });

  it("uses a clean empty-binding description for english", () => {
    const settings = buildSettings("en");

    expect(settings.find((setting) => setting.key === "tabs:toggle-pin")).toMatchObject({
      type: "string",
      default: "",
      title: "Toggle pin",
      description: "Toggle pin. Restart Logseq to apply this change.",
    });
  });
});

describe("keyBindings", () => {
  it("stores translation keys for labels", () => {
    expect(keyBindings["tabs:close"].labelKey).toBe("keybindings.closeTab");
  });
});

describe("settings module exports", () => {
  it("does not expose a static english settings array", () => {
    expect("settings" in settingsModule).toBe(false);
  });
});
