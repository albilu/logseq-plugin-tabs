export type SupportedLocale = "en" | "fr" | "de" | "nl" | "zh";

export type TranslationKey =
  | "tooltip.createNewPage"
  | "tabs.closeAll"
  | "commands.closeAll"
  | "commands.closeOthers"
  | "commands.selectTab"
  | "keybindings.togglePin"
  | "keybindings.closeTab"
  | "keybindings.selectNext"
  | "keybindings.selectPrev"
  | "settings.keybindingDescription"
  | "settings.keybindingDescriptionWithoutBinding"
  | "settings.inheritCustomCss.title"
  | "settings.inheritCustomCss.description"
  | "settings.showSingleTab.title"
  | "settings.showSingleTab.description"
  | "settings.closeButtonLeft.title"
  | "settings.closeButtonLeft.description"
  | "settings.hideCloseAllButton.title"
  | "settings.hideCloseAllButton.description";

type TranslationParams = {
  index?: number;
  label?: string;
  binding?: string;
};

const translations: Record<SupportedLocale, Record<TranslationKey, string>> = {
  en: {
    "tooltip.createNewPage": "Create New Page",
    "tabs.closeAll": "Close All",
    "commands.closeAll": "Close all tabs",
    "commands.closeOthers": "Close other tabs",
    "commands.selectTab": "Select tab {index}",
    "keybindings.togglePin": "Toggle pin",
    "keybindings.closeTab": "Close tab",
    "keybindings.selectNext": "Select next tab",
    "keybindings.selectPrev": "Select previous tab",
    "settings.keybindingDescription":
      "{label}: {binding}. Restart Logseq to apply this change.",
    "settings.keybindingDescriptionWithoutBinding":
      "{label}. Restart Logseq to apply this change.",
    "settings.inheritCustomCss.title": "Inherit custom.css?",
    "settings.inheritCustomCss.description":
      "Apply styles from your graph's custom.css to the tabs plugin.",
    "settings.showSingleTab.title": "Show a single tab?",
    "settings.showSingleTab.description":
      "Keep the tab bar visible even when only one tab is open.",
    "settings.closeButtonLeft.title": "Put the close button on the left?",
    "settings.closeButtonLeft.description":
      "Show each tab's close button before the title.",
    "settings.hideCloseAllButton.title": "Hide the close-all button?",
    "settings.hideCloseAllButton.description":
      'Hide the "Close all" button in the tab bar.',
  },
  fr: {
    "tooltip.createNewPage": "Créer une nouvelle page",
    "tabs.closeAll": "Tout fermer",
    "commands.closeAll": "Fermer tous les onglets",
    "commands.closeOthers": "Fermer les autres onglets",
    "commands.selectTab": "Sélectionner l'onglet {index}",
    "keybindings.togglePin": "Basculer l'épinglage",
    "keybindings.closeTab": "Fermer l'onglet",
    "keybindings.selectNext": "Sélectionner l'onglet suivant",
    "keybindings.selectPrev": "Sélectionner l'onglet précédent",
    "settings.keybindingDescription":
      "{label} : {binding}. Redémarrez Logseq pour appliquer ce changement.",
    "settings.keybindingDescriptionWithoutBinding":
      "{label}. Redémarrez Logseq pour appliquer ce changement.",
    "settings.inheritCustomCss.title": "Hériter de custom.css ?",
    "settings.inheritCustomCss.description":
      "Appliquer au plugin d'onglets les styles du fichier custom.css de votre graphe.",
    "settings.showSingleTab.title": "Afficher un seul onglet ?",
    "settings.showSingleTab.description":
      "Garder la barre d'onglets visible même lorsqu'un seul onglet est ouvert.",
    "settings.closeButtonLeft.title": "Placer le bouton de fermeture à gauche ?",
    "settings.closeButtonLeft.description":
      "Afficher le bouton de fermeture de chaque onglet avant le titre.",
    "settings.hideCloseAllButton.title": "Masquer le bouton Tout fermer ?",
    "settings.hideCloseAllButton.description":
      'Masquer le bouton "Tout fermer" dans la barre d\'onglets.',
  },
  de: {
    "tooltip.createNewPage": "Neue Seite erstellen",
    "tabs.closeAll": "Alle schließen",
    "commands.closeAll": "Alle Tabs schliessen",
    "commands.closeOthers": "Andere Tabs schliessen",
    "commands.selectTab": "Tab {index} auswählen",
    "keybindings.togglePin": "Anheften umschalten",
    "keybindings.closeTab": "Tab schließen",
    "keybindings.selectNext": "Nächsten Tab auswählen",
    "keybindings.selectPrev": "Vorherigen Tab auswählen",
    "settings.keybindingDescription":
      "{label}: {binding}. Starte Logseq neu, um diese Änderung anzuwenden.",
    "settings.keybindingDescriptionWithoutBinding":
      "{label}. Starte Logseq neu, um diese Änderung anzuwenden.",
    "settings.inheritCustomCss.title": "custom.css übernehmen?",
    "settings.inheritCustomCss.description":
      "Die Stile aus der custom.css deines Graphen auf das Tab-Plugin anwenden.",
    "settings.showSingleTab.title": "Nur einen Tab anzeigen?",
    "settings.showSingleTab.description":
      "Die Tableiste sichtbar lassen, auch wenn nur ein Tab geöffnet ist.",
    "settings.closeButtonLeft.title": "Schließen-Schaltfläche links anzeigen?",
    "settings.closeButtonLeft.description":
      "Die Schließen-Schaltfläche jedes Tabs vor dem Titel anzeigen.",
    "settings.hideCloseAllButton.title": "Alle-schließen-Schaltfläche ausblenden?",
    "settings.hideCloseAllButton.description":
      "Die \"Alle schließen\"-Schaltfläche in der Tableiste ausblenden.",
  },
  nl: {
    "tooltip.createNewPage": "Nieuwe pagina maken",
    "tabs.closeAll": "Alles sluiten",
    "commands.closeAll": "Alle tabbladen sluiten",
    "commands.closeOthers": "Andere tabbladen sluiten",
    "commands.selectTab": "Selecteer tabblad {index}",
    "keybindings.togglePin": "Vastzetten aan/uit",
    "keybindings.closeTab": "Tab sluiten",
    "keybindings.selectNext": "Volgend tabblad selecteren",
    "keybindings.selectPrev": "Vorig tabblad selecteren",
    "settings.keybindingDescription":
      "{label}: {binding}. Start Logseq opnieuw om deze wijziging toe te passen.",
    "settings.keybindingDescriptionWithoutBinding":
      "{label}. Start Logseq opnieuw om deze wijziging toe te passen.",
    "settings.inheritCustomCss.title": "custom.css overnemen?",
    "settings.inheritCustomCss.description":
      "Pas de stijlen uit de custom.css van je graph toe op de tabplugin.",
    "settings.showSingleTab.title": "Eén tabblad tonen?",
    "settings.showSingleTab.description":
      "Houd de tabbalk zichtbaar, zelfs wanneer er maar één tabblad open is.",
    "settings.closeButtonLeft.title": "Sluitknop links plaatsen?",
    "settings.closeButtonLeft.description":
      "Toon de sluitknop van elk tabblad voor de titel.",
    "settings.hideCloseAllButton.title": "Knop Alles sluiten verbergen?",
    "settings.hideCloseAllButton.description":
      'Verberg de knop "Alles sluiten" in de tabbalk.',
  },
  zh: {
    "tooltip.createNewPage": "创建新页面",
    "tabs.closeAll": "关闭全部",
    "commands.closeAll": "关闭所有标签页",
    "commands.closeOthers": "关闭其他标签页",
    "commands.selectTab": "选择标签页 {index}",
    "keybindings.togglePin": "切换固定",
    "keybindings.closeTab": "关闭标签页",
    "keybindings.selectNext": "选择下一个标签页",
    "keybindings.selectPrev": "选择上一个标签页",
    "settings.keybindingDescription":
      "{label}：{binding}。重新启动 Logseq 以应用此更改。",
    "settings.keybindingDescriptionWithoutBinding":
      "{label}。重新启动 Logseq 以应用此更改。",
    "settings.inheritCustomCss.title": "继承 custom.css？",
    "settings.inheritCustomCss.description":
      "将图谱 custom.css 中的样式应用到标签页插件。",
    "settings.showSingleTab.title": "显示单个标签页？",
    "settings.showSingleTab.description":
      "即使只打开了一个标签页，也保持标签栏可见。",
    "settings.closeButtonLeft.title": "将关闭按钮放在左侧？",
    "settings.closeButtonLeft.description":
      "在标题前显示每个标签页的关闭按钮。",
    "settings.hideCloseAllButton.title": "隐藏“关闭全部”按钮？",
    "settings.hideCloseAllButton.description":
      "隐藏标签栏中的“关闭全部”按钮。",
  },
};

export const translationCatalog = translations;

let currentLocale: SupportedLocale = "en";

export function resolveLocaleFromPreferredLanguage(
  locale?: string | null
): SupportedLocale {
  const value = locale?.toLowerCase();

  if (value?.startsWith("fr")) {
    return "fr";
  }

  if (value?.startsWith("de")) {
    return "de";
  }

  if (value?.startsWith("nl")) {
    return "nl";
  }

  if (value?.startsWith("zh")) {
    return "zh";
  }

  return "en";
}

export function normalizeLocale(locale?: string | null): SupportedLocale {
  return resolveLocaleFromPreferredLanguage(locale);
}

export async function getLocaleFromUserConfigs(
  userConfigs?: Partial<{ preferredLanguage: string }>
): Promise<SupportedLocale> {
  return normalizeLocale(userConfigs?.preferredLanguage);
}

export function getCurrentLocale(): SupportedLocale {
  return currentLocale;
}

export function setCurrentLocale(locale: SupportedLocale): void {
  currentLocale = locale;
}

export function t(
  key: TranslationKey,
  options?: { locale?: SupportedLocale; params?: TranslationParams }
): string {
  const locale = options?.locale ?? currentLocale;
  const template = translations[locale]?.[key] ?? translations.en[key];
  const params = options?.params;

  if (key === "commands.selectTab" && params?.index == null) {
    return template.replace(" {index}", "");
  }

  return template
    .replace("{index}", String(params?.index ?? ""))
    .replace("{label}", params?.label ?? "")
    .replace("{binding}", params?.binding ?? "");
}
