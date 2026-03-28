import { Platform } from 'react-native'

function getEnvVar(key: string): string | undefined {
  if (Platform.OS === 'web') {
    return process.env[key]
  }

  // On native, use expo-constants
  try {
    const Constants = require('expo-constants')
    const expoConfig = Constants.default?.expoConfig?.extra
    if (expoConfig?.[key]) {
      return expoConfig[key]
    }
  } catch {
    // expo-constants not available
  }

  // Fallback: try process.env (works with expo env vars prefixed EXPO_PUBLIC_)
  return process.env[key]
}

export const env = {
  FIREBASE_API_KEY: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY') ?? getEnvVar('EXPO_PUBLIC_FIREBASE_API_KEY') ?? '',
  FIREBASE_AUTH_DOMAIN: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN') ?? getEnvVar('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN') ?? '',
  FIREBASE_PROJECT_ID: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID') ?? getEnvVar('EXPO_PUBLIC_FIREBASE_PROJECT_ID') ?? '',
  FIREBASE_STORAGE_BUCKET: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET') ?? getEnvVar('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET') ?? '',
  FIREBASE_MESSAGING_SENDER_ID: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID') ?? getEnvVar('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID') ?? '',
  FIREBASE_APP_ID: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID') ?? getEnvVar('EXPO_PUBLIC_FIREBASE_APP_ID') ?? '',
  FIREBASE_MEASUREMENT_ID: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID') ?? getEnvVar('EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID') ?? '',
  API_BASE_URL: getEnvVar('NEXT_PUBLIC_API_BASE_URL') ?? getEnvVar('EXPO_PUBLIC_API_BASE_URL') ?? '',
} as const
