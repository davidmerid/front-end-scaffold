import { createFont, createMedia, createTamagui, createTokens } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { createAnimations } from '@tamagui/animations-css'
import { tokens as defaultTokens } from '@tamagui/config/v3'

const headingFont = createFont({
  family: 'System',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 40,
    10: 48,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 22,
    4: 24,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 48,
    10: 56,
    sm: 20,
    md: 22,
    lg: 24,
    xl: 28,
  },
  weight: {
    4: '700',
    5: '700',
    6: '800',
  },
  letterSpacing: {
    4: 0,
    5: -0.5,
    6: -1,
  },
})

const bodyFont = createFont({
  family: 'System',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    sm: 20,
    md: 24,
    lg: 26,
    xl: 28,
  },
  weight: {
    1: '400',
    3: '500',
    5: '600',
  },
  letterSpacing: {
    1: 0,
    2: 0,
  },
})

const tokens = createTokens({
  ...defaultTokens,
  size: {
    ...defaultTokens.size,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  },
  space: {
    ...defaultTokens.space,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    ...defaultTokens.radius,
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  color: {
    ...defaultTokens.color,
    primary: defaultTokens.color.blue10Light,
    primaryLight: defaultTokens.color.blue6Light,
    primaryDark: defaultTokens.color.blue10Dark,
    secondary: defaultTokens.color.gray10Light,
    secondaryLight: defaultTokens.color.gray6Light,
    secondaryDark: defaultTokens.color.gray10Dark,
    success: defaultTokens.color.green10Light,
    successLight: defaultTokens.color.green6Light,
    error: defaultTokens.color.red10Light,
    errorLight: defaultTokens.color.red6Light,
    warning: defaultTokens.color.yellow10Light,
    warningLight: defaultTokens.color.yellow6Light,
    backgroundLight: defaultTokens.color.gray1Light,
    backgroundDark: defaultTokens.color.gray1Dark,
    surfaceLight: defaultTokens.color.gray2Light,
    surfaceDark: defaultTokens.color.gray2Dark,
    textPrimary: defaultTokens.color.gray12Light,
    textSecondary: defaultTokens.color.gray11Light,
    textMuted: defaultTokens.color.gray9Light,
  },
})

const lightTheme = {
  background: tokens.color.backgroundLight,
  backgroundHover: tokens.color.surfaceLight,
  backgroundPress: tokens.color.gray3Light,
  backgroundFocus: tokens.color.surfaceLight,
  color: tokens.color.textPrimary,
  colorHover: tokens.color.textPrimary,
  colorPress: tokens.color.textPrimary,
  colorFocus: tokens.color.textPrimary,
  borderColor: tokens.color.gray6Light,
  borderColorHover: tokens.color.gray7Light,
  borderColorPress: tokens.color.gray8Light,
  borderColorFocus: tokens.color.gray7Light,
  outlineColor: tokens.color.primary,
  placeholderColor: tokens.color.textMuted,
  shadowColor: tokens.color.gray8Light,
  shadowColorHover: tokens.color.gray9Light,
}

const darkTheme = {
  background: tokens.color.backgroundDark,
  backgroundHover: tokens.color.surfaceDark,
  backgroundPress: tokens.color.gray3Dark,
  backgroundFocus: tokens.color.surfaceDark,
  color: tokens.color.gray12Dark,
  colorHover: tokens.color.gray12Dark,
  colorPress: tokens.color.gray12Dark,
  colorFocus: tokens.color.gray12Dark,
  borderColor: tokens.color.gray6Dark,
  borderColorHover: tokens.color.gray7Dark,
  borderColorPress: tokens.color.gray8Dark,
  borderColorFocus: tokens.color.gray7Dark,
  outlineColor: tokens.color.primaryDark,
  placeholderColor: tokens.color.gray9Dark,
  shadowColor: tokens.color.gray8Dark,
  shadowColorHover: tokens.color.gray9Dark,
}

const media = createMedia({
  xs: { maxWidth: 660 },
  sm: { maxWidth: 860 },
  md: { maxWidth: 980 },
  lg: { maxWidth: 1120 },
  xl: { maxWidth: 1280 },
  xxl: { maxWidth: 1420 },
  gtXs: { minWidth: 660 + 1 },
  gtSm: { minWidth: 860 + 1 },
  gtMd: { minWidth: 980 + 1 },
  gtLg: { minWidth: 1120 + 1 },
  short: { maxHeight: 820 },
  tall: { minHeight: 820 },
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
})

const animations = createAnimations({
  quick: 'ease-in 150ms',
  medium: 'ease-in 300ms',
  lazy: 'ease-in 450ms',
  bouncy: 'ease-in 200ms',
  slow: 'ease-in 500ms',
  tooltip: 'ease-in 100ms',
})

export const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  media,
  animations,
  shorthands,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
})

export default config

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
