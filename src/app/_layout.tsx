import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import "../../global.css"
import { useColorScheme } from '../hooks/use-color-scheme.web';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvder } from './context/AppProvider';
import { ChatWrapper } from '../component/ChatWrapper';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export const unstable_settings = {
  anchor: '(tabs)',
};



export default function RootLayout() {
  const colorScheme = useColorScheme();


  return (
    <GestureHandlerRootView className='flex-1'>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache} >
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ChatWrapper>
            <AppProvder>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </AppProvder>
          </ChatWrapper>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ClerkProvider >
    </GestureHandlerRootView>
  );
}
