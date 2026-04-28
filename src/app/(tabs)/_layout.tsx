import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
import { View } from 'react-native';
export default function TabLayout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />
  }
  return (
    <View className='blur-md rounded-md flex-1'>
      <NativeTabs
        screenOptions={{
          // 1. Make the bar itself transparent
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute', // Required to make it truly float/overlay
            borderTopWidth: 0,
            elevation: 0,        // Removes Android shadow
          },
          // 2. Ensure the background component is also transparent
          tabBarBackground: () => (
            <View style={{ flex: 1, backgroundColor: 'transparent' }} />
          ),
          // 3. Optional: Set a global active color for your labels/icons
          tabBarActiveTintColor: '#6C5CE7',
        }}
      >
        <NativeTabs.Trigger name="index">
          <Label selectedStyle={{ color: "purple" }}>Chat</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="explore">
          <Label selectedStyle={{ color: "purple" }}>Expore</Label>
        </NativeTabs.Trigger>


        <NativeTabs.Trigger name="profile">
          <Label selectedStyle={{ color: "purple" }}>Profile</Label>
        </NativeTabs.Trigger>

      </NativeTabs>
    </View>
  );
}

