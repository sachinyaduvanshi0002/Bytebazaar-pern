import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../Store/useThemeStore";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">

      {/* BUTTON */}
      <button className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      {/* DROPDOWN */}
      <div className="dropdown-content mt-2 p-2 shadow-2xl bg-base-200 rounded-2xl w-56 border border-base-content/10">

        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)}
            className={`w-full px-4 py-2 rounded-lg flex items-center gap-3 ${
              theme === themeOption.name
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/10"
            }`}
          >
            <PaletteIcon className="size-4" />

            <span className="text-sm">{themeOption.label}</span>

            {/* COLORS */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}

      </div>
    </div>
  );
}

export default ThemeSelector;