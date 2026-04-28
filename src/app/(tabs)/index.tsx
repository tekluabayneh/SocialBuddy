import { useAuth } from '@clerk/expo';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  const { signOut } = useAuth()
  return (
    <SafeAreaView>
      <Text className='text-red-300'> this is text </Text>
      <Pressable className='' onPress={() => signOut()} >
        <Text>
          Signout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}



