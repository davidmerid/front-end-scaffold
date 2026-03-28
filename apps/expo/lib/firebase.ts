import { getApp } from '@react-native-firebase/app'
import { getAuth } from '@react-native-firebase/auth'

// React Native Firebase auto-initializes from google-services.json / GoogleService-Info.plist
export const firebaseApp = getApp()
export const firebaseAuth = getAuth(firebaseApp)
