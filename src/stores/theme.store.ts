import { create } from 'zustand'
import { createTheme } from 'uikit-3it-react'
import type { Logotipo } from 'uikit-3it-react'

//Factory
import { defaultLogotipo } from '@/factories'

// Utils
const { handleThemeColors, handleThemeLogos } = createTheme()

interface ThemeState {
  logotipo: Logotipo
  errorBack: Error | null
  getTheme: () => Promise<void>
}

export const useStoreTheme = create<ThemeState>((set) => ({
  logotipo: { ...defaultLogotipo },
  errorBack: null,

  getTheme: async () => {
    try {
      handleThemeColors([
        // Light colors
        '#005AEE',
        '#3BC0CF',
        '#3BC0CF',
        // Dark colors
        '#005AEE',
        '#3BC0CF',
        '#3BC0CF'
      ])
      set({ logotipo: handleThemeLogos([
        // Light logos
        '/img/logo-light.svg',
        '/img/isotipo-light.svg',
        // Dark logos
        '/img/logo-dark.svg',
        '/img/isotipo-dark.svg'
      ])})
    } catch (error) {
      set({ errorBack: error as Error })
    }
  }
}))
