import "@logseq/libs";
import React from "react";
import * as ReactDOM from "react-dom/client";
import "virtual:windi.css";
import { getLocaleFromUserConfigs, setCurrentLocale } from "./i18n";
import { buildSettings } from "./settings";

import App from "./App";
import "./reset.css";
import { isMac } from "./utils";

export async function bootstrapLocaleSettings() {
  const userConfigs = await logseq.App.getUserConfigs().catch(() => undefined);
  const locale = await getLocaleFromUserConfigs(userConfigs);

  setCurrentLocale(locale);
  logseq.useSettingsSchema(buildSettings(locale));

  return locale;
}

async function main() {
  const pluginId = logseq.baseInfo.id;
  console.info(`#${pluginId}: MAIN`);
  const locale = await bootstrapLocaleSettings();

  const mac = isMac();
  logseq.provideStyle(`
  [data-active-keystroke=${mac ? "Meta" : "Control"} i]
    :is(.block-ref,.page-ref,a.tag) {
    cursor: n-resize
  }
  `);

  const root = ReactDOM.createRoot(document.getElementById("app")!);
  root.render(
    <React.StrictMode>
      <App locale={locale} />
    </React.StrictMode>
  );

  parent.document.body.classList.add('is-plugin-tabs-enabled');
  logseq.beforeunload(async () => {
    parent.document.body.classList.remove('is-plugin-tabs-enabled');
  });

  console.info(`#${pluginId}: MAIN DONE`);
}

logseq.ready(main).catch(console.error);
