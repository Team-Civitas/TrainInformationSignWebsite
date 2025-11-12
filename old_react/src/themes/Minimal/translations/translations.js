const languageModules = import.meta.glob('./**/!(*test).json', { eager: true });

const translations = {};
const languageOptions = [];

for (const path in languageModules) {
  const name = path.split('/').pop().replace('.json', '');
  const content = languageModules[path].default;

  translations[name] = content;

  languageOptions.push({
    value: name,
    label: name
  });
}

export { translations, languageOptions };
