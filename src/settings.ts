import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";
import { SupportedLocale, t, TranslationKey } from "./i18n";

type LocalizableSettingSchema = Omit<SettingSchemaDesc, "title" | "description">;
type KeyBindingLabelKey = Extract<TranslationKey, `keybindings.${string}`>;
type SettingTitleKey = Extract<TranslationKey, `settings.${string}.title`>;
type SettingDescriptionKey = Extract<TranslationKey, `settings.${string}.description`>;

type KeyBinding = {
  labelKey: KeyBindingLabelKey;
  binding: string;
};

type KeyBindingId =
  | "tabs:toggle-pin"
  | "tabs:close"
  | "tabs:select-next"
  | "tabs:select-prev";

export const keyBindings: Record<KeyBindingId, KeyBinding> = {
  "tabs:toggle-pin": {
    labelKey: "keybindings.togglePin",
    binding: "",
  },
  "tabs:close": {
    labelKey: "keybindings.closeTab",
    binding: "mod+shift+w",
  },
  "tabs:select-next": {
    labelKey: "keybindings.selectNext",
    binding: "ctrl+tab",
  },
  "tabs:select-prev": {
    labelKey: "keybindings.selectPrev",
    binding: "ctrl+shift+tab",
  }
};

export const inheritCustomCSSSetting: LocalizableSettingSchema = {
  key: "tabs:inherit-custom-css",
  default: false,
  type: "boolean",
};

export const showSingleTab: LocalizableSettingSchema = {
  key: "tabs:show-single-tab",
  type: "boolean",
  default: true,
};

export const closeButtonLeft: LocalizableSettingSchema = {
  key: "tabs:close-button-left",
  type: "boolean",
  default: false,
};

export const hideCloseAllButton: LocalizableSettingSchema = {
  key: "tabs:hide-close-all-button",
  type: "boolean",
  default: false,
};

type LocalizedSetting = {
  setting: LocalizableSettingSchema;
  titleKey: SettingTitleKey;
  descriptionKey: SettingDescriptionKey;
};

const localizedSettings: LocalizedSetting[] = [
  {
    setting: inheritCustomCSSSetting,
    titleKey: "settings.inheritCustomCss.title",
    descriptionKey: "settings.inheritCustomCss.description",
  },
  {
    setting: showSingleTab,
    titleKey: "settings.showSingleTab.title",
    descriptionKey: "settings.showSingleTab.description",
  },
  {
    setting: closeButtonLeft,
    titleKey: "settings.closeButtonLeft.title",
    descriptionKey: "settings.closeButtonLeft.description",
  },
  {
    setting: hideCloseAllButton,
    titleKey: "settings.hideCloseAllButton.title",
    descriptionKey: "settings.hideCloseAllButton.description",
  },
];

function localizeSetting(
  localizedSetting: LocalizedSetting,
  locale: SupportedLocale
): SettingSchemaDesc {
  return {
    ...localizedSetting.setting,
    title: t(localizedSetting.titleKey, { locale }),
    description: t(localizedSetting.descriptionKey, { locale }),
  };
}

function buildKeybindingDescription(
  locale: SupportedLocale,
  label: string,
  binding: string
): string {
  return t(
    binding
      ? "settings.keybindingDescription"
      : "settings.keybindingDescriptionWithoutBinding",
    {
      locale,
      params: {
        label,
        binding,
      },
    }
  );
}

function buildKeybindingSettings(locale: SupportedLocale): SettingSchemaDesc[] {
  return Object.entries(keyBindings).map(([key, value]) => {
    const label = t(value.labelKey, { locale });

    return {
      key,
      title: label,
      type: "string",
      default: value.binding,
      description: buildKeybindingDescription(locale, label, value.binding),
    };
  });
}

export function buildSettings(locale: SupportedLocale): SettingSchemaDesc[] {
  return [
    ...buildKeybindingSettings(locale),
    ...localizedSettings.map((setting) => localizeSetting(setting, locale))
  ];
}
