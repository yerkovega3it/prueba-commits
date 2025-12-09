import { create } from "zustand";

//Factory
import { defaultLogotipo } from "@/factories";

// Stub type to replace uikit
interface Logotipo {
  light: string;
  dark: string;
}

// Stub utils to replace uikit createTheme
const handleThemeColors = () => {};
const handleThemeLogos = (logos: string[]) => ({
  light: logos[0] || "",
  dark: logos[2] || "",
});

interface ThemeState {
  logotipo: Logotipo;
  errorBack: Error | null;
  getTheme: () => Promise<void>;
}

export const useStoreTheme = create<ThemeState>((set) => ({
  logotipo: { dark: "", light: "", ...defaultLogotipo },
  errorBack: null,

  getTheme: async () => {
    try {
      handleThemeColors();
      set({
        logotipo: handleThemeLogos([
          // Light logos
          "/img/logo-light.svg",
          "/img/isotipo-light.svg",
          // Dark logos
          "/img/logo-dark.svg",
          "/img/isotipo-dark.svg",
        ]),
      });
    } catch (error) {
      set({ errorBack: error as Error });
    }
  },
}));
