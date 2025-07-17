import { themes } from "../themes/themes";

function AcquireTheme({ theme, trainArray }) {
  const ThemeComponent = themes[theme] || themes['Standard'];
  return <ThemeComponent trainArray={trainArray} />;
}

export default AcquireTheme