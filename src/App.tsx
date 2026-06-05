import React from "react";
import type { SupportedLocale } from "./i18n";
import { PageTabs } from "./PageTabs";
import { usePreventFocus, useThemeMode } from "./utils";

type AppProps = {
  locale: SupportedLocale;
};

function App({ locale }: AppProps): JSX.Element {
  const themeMode = useThemeMode();
  usePreventFocus();
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
      }}
      className={`${themeMode} drag-region`}
    >
      <PageTabs locale={locale} />
    </main>
  );
}

export default App;
