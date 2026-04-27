import { Redirect, } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
export default function TabLayout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />
  }
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon
          ios={{ type: 'sfSymbol', name: 'house.fill' }}
          android={{ type: 'imageSource', imageSource: 'home' }}
        />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}
