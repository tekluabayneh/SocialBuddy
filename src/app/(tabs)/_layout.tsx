import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
export default function TabLayout() {
  const { isSignedIn } = useAuth()
  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />
  }

  return (
    <View className='blur-md rounded-md flex-1'>
      <Tabs screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: "gray",
        headerShown: false,

        tabBarStyle: {
          flex: 1,
          position: 'absolute',
          bottom: 10,
          left: 40,
          right: 40,
          elevation: 0,
          backgroundColor: 'transparent',
          borderRadius: 30,
          height: 60,
          borderTopWidth: 0,
        },
      }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
            title: "Home",
            tabBarItemStyle: {
              backgroundColor: '#2D2D44',
              borderRadius: 90,
              padding: 0,
              marginHorizontal: 20,
              marginVertical: 4,
              width: 12,
            },
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ color }) => <Ionicons size={28} name="eye" color={color} />,
            title: "explore",
            tabBarItemStyle: {
              flex: 2,
              backgroundColor: '#7F5AF0',
              borderRadius: 90,
              padding: 0,
              marginHorizontal: 20,
              marginVertical: 4,
              width: 12,
            }
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
            title: "Home",
            tabBarItemStyle: {
              backgroundColor: '#2D2D44',
              borderRadius: 90,
              padding: 0,
              marginHorizontal: 30,
              marginVertical: 4,
              width: 12,
            },
          }}

        />


      </Tabs>

    </View >
  );
}

