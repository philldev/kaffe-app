import { useIsDark, useToggleTheme } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  const toggleTheme = useToggleTheme();
  const isDark = useIsDark();
  return (
    <div className="dark:bg-black bg-white min-h-screen">
      <Button onClick={toggleTheme}>{isDark ? "Dark" : "Light"}</Button>
    </div>
  );
}

export default App;
