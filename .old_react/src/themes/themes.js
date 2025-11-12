// Load all theme modules
const themeModules = import.meta.glob('./**/!(*test).jsx', { eager: true });

const themes = {};
const themeSettings = {};
const themeList = [];

for (const path in themeModules) {
  const name = path.split('/').slice(-2, -1)[0]; // Get folder name = theme name
  const module = themeModules[path];

  themes[name] = module.default;
  if (module.ThemeSettings) {
    themeSettings[name] = module.ThemeSettings;
  }

  themeList.push(name);
}

themeList.sort((a, b) => {
  if (a === "Standard") return -1;
  if (b === "Standard") return 1;
  return a.localeCompare(b);
});

export { themes, themeList, themeSettings };
