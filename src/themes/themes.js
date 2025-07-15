// Automatically Loads all themes
const themeModules = import.meta.glob('./**/!(*test).jsx', { eager: true });

const themes = {};
const themeList = [];

for (const path in themeModules) {
  const name = path.split('/').slice(-2, -1)[0]; // gets folder name aka the theme name
  themes[name] = themeModules[path].default;
  themeList.push(name);
}

export { themes, themeList };
