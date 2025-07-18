import { themes, themeSettings } from "../themes/themes";

function AcquireTheme({ theme, trainArray }) {
  const ThemeComponent = themes[theme] || themes['Standard'];
  return <ThemeComponent trainArray={trainArray} />;
}

function AcquireThemeSettings({ theme }) {
  const SettingsComponent = themeSettings[theme] || themeSettings['Standard'];
  return <SettingsComponent />
}

export { AcquireTheme, AcquireThemeSettings }