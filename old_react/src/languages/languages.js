const languageModules = import.meta.glob('./**/!(*test).json', { eager: true });

const translations = {};
const languageOptions = [];

for (const path in languageModules) {
  const name = path.split('/').pop().replace('.json', '');
  const content = languageModules[path].default;

  translations[name] = content;

  if (content.label) {
    languageOptions.push({ value: name, label: content.label, flag: content.flag });
  } else {
    console.warn(`Missing label in language file: ${path}`);
  }
}


export { translations, languageOptions };
