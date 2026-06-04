## Summary

Add a small internal localization layer that reads the current Logseq locale and translates selected plugin UI copy. This change will localize the new page tooltip, the close-all tab label, command palette labels, and settings titles/descriptions. Supported locales are English, French, German, Dutch, and Chinese, with English as the fallback.

## Goals

- Pick up the active Logseq locale at runtime.
- Localize these plugin surfaces:
  - `Create New Page` tooltip in `src/PageTabs.tsx`
  - `Close All` label in `src/PageTabs.tsx`
  - Command palette labels in `src/PageTabs.tsx`
  - Settings titles and descriptions in `src/settings.ts`
- Support locale variants such as `fr-FR`, `de-DE`, `nl-NL`, `zh-CN`, and `zh-TW`.
- Fall back cleanly to English when locale data is missing or unsupported.

## Non-Goals

- Do not localize every string in the plugin.
- Do not change dynamic page names or content provided by Logseq.
- Do not change existing behavior for the `Journals` fallback string in this task.
- Do not add external i18n dependencies.

## Recommended Approach

Implement a small in-repo translation module and use it from the existing UI and settings code.

This is the smallest maintainable solution for the plugin's current size:

- No dependency or framework changes
- Centralized locale logic instead of scattered conditionals
- Easy to extend later if more strings are added
- Simple to test with focused unit tests

## Architecture

Add a new module at `src/i18n.ts`.

It should provide:

- A locale normalization helper that converts runtime locale strings into one of:
  - `en`
  - `fr`
  - `de`
  - `nl`
  - `zh`
- A translation dictionary keyed by stable string identifiers
- A `t(key, params?)` helper that returns the translated string for the current or requested locale

The locale normalization rules are:

- `fr*` maps to `fr`
- `de*` maps to `de`
- `nl*` maps to `nl`
- `zh*` maps to `zh`
- all other values map to `en`

The translation helper must fall back to the English entry when:

- the runtime locale is unavailable
- the locale is unsupported
- a locale-specific translation is missing for a known key

## Runtime Locale Source

The localization module should read the Logseq locale from runtime when available.

Implementation should prefer the Logseq-provided locale source and normalize its value before lookup. If Logseq does not expose a locale value in the current runtime, the plugin should default to English without throwing.

## Translation Scope

### `src/PageTabs.tsx`

Localize:

- `Create New Page`
- `Close All`
- `Select tab {n}`
- `Close all tabs`
- `Close other tabs`

The `+` button behavior stays unchanged; only the tooltip text changes.

### `src/settings.ts`

Localize:

- keybinding labels used by settings generation
- setting titles
- setting descriptions

This requires settings generation to stop depending on fully hardcoded English strings.

The generated settings schema should still have the same keys, defaults, and behavior. Only displayed text changes by locale.

## Data Flow

1. Plugin startup or module evaluation obtains the current locale through the localization helper.
2. `settings.ts` builds localized schema text from translation keys.
3. `PageTabs.tsx` uses `t(...)` for rendered labels and command registration labels.
4. Missing locale data or missing keys resolve to English.

The translation keys should remain stable and English-based so call sites are easy to read.

## Testing

Add unit tests first, then implement the production code.

Required tests:

- locale normalization tests covering:
  - `fr`
  - `fr-FR`
  - `de-DE`
  - `nl-NL`
  - `zh-CN`
  - `zh-TW`
  - unsupported locales falling back to `en`
  - missing locale falling back to `en`
- translation lookup tests covering:
  - translated values for `fr`, `de`, `nl`, and `zh`
  - English fallback when a locale is unsupported
  - English fallback when a locale-specific value is missing
- settings generation tests covering:
  - localized title/description output for at least one non-English locale
  - unchanged setting keys/defaults despite localization

Tests should stay focused on the new i18n module and settings generation logic. No UI rendering test is required unless the current code structure makes it simpler than isolating the translation calls.

## Error Handling

- Missing runtime locale must not throw.
- Missing translation keys should resolve to English if the key exists there.
- The implementation should keep the dictionary small and explicit so omissions are easy to spot during development.

## Implementation Notes

- Keep the localization layer flat and minimal.
- Avoid introducing React context or global state for this feature.
- Avoid moving unrelated strings into the dictionary.
- Preserve existing command and settings registration behavior.

## Risks

- Logseq locale access may vary by runtime shape, so the implementation should guard property access carefully.
- Settings are registered at startup, so locale lookup must be available at that time.
- If new user-facing strings are added later outside the translation helper, localization coverage may drift unless contributors follow the same pattern.

## Acceptance Criteria

- The plugin picks up the Logseq locale and selects French, German, Dutch, Chinese, or English.
- The new page tooltip and close-all label are translated for supported locales.
- Command palette labels are translated for supported locales.
- Settings titles and descriptions are translated for supported locales.
- Unsupported or missing locales fall back to English.
- Automated tests cover locale normalization, translation fallback, and localized settings generation.
