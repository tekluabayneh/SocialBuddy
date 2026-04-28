
import { COLORS } from '@/src/lib/theme';
import { useAuth, useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Image } from "expo-image"
import { SafeAreaView } from 'react-native-safe-area-context';

const MENU_ITEMS = [
  { icon: "notifications-outline", label: "Notifications", color: COLORS.primary },
  { icon: "bookmark-outline", label: "Saved Resources", color: COLORS.accent },
  { icon: "time-outline", label: "Study History", color: COLORS.accentSecondary },
  { icon: "settings-outline", label: "Settings", color: COLORS.textMuted },
];

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView>
        <Text className='text-3xl pl-2  text-red-50 font-extrabold'>Profile</Text>

        <View className='items-center py-3'>
          <View className='mb-3.5 relative'>
            <Image source={user?.imageUrl}
              style={{ width: 88, height: 88, borderRadius: 44 }}
            />

            <View className="absolute bottom-[2px] right-[2px] h-[18px] w-[18px] rounded-[9px] bg-accent-secondary border-[3px] border-background" />
          </View>

          <Text className='text-white text-2xl font-bold'>{user?.fullName || user?.username || "Student"}</Text>

          <Text className='text-white  text-gray-200'>{user?.primaryEmailAddress?.emailAddress}</Text>

          <View className="mt-3 flex-row items-center gap-1.5 rounded-full bg-[#FDCB6E1E] px-3.5 py-1.5">
            <Ionicons name="flame" size={16} color="#FDCB6E" />
            <Text className="text-sm font-semibold text-[#FDCB6E]">7 day study streak</Text>
          </View>
        </View>

        <View className="mt-2 mb-6 flex-row gap-3 px-5">
          <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
            <Text className="text-2xl font-bold text-primary">24</Text>
            <Text className="mt-1 text-xs text-foreground-muted">Sessions</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
            <Text className="text-2xl font-bold text-primary">12</Text>
            <Text className="mt-1 text-xs text-foreground-muted">Partners</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl border border-border bg-surface px-4 py-4">
            <Text className="text-2xl font-bold text-primary">48h</Text>
            <Text className="mt-1 text-xs text-foreground-muted">Study Time</Text>
          </View>
        </View>

        <View className='px-1 gap-3'>
          {
            MENU_ITEMS.map((item, idx) => (
              <Pressable
                key={idx}
                className="mb-1.5 flex-row justify-between items-center gap-3.5 rounded-xl border border-border bg-surface px-4 py-4" >
                <View className="flex flex-row h-10  gap-3 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}15` }} >
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                  <Text className='text-white font-bold'>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.textSubtle} />
              </Pressable>

            ))

          }
        </View>

        {/* SIGN OUT BTN */}
        <Pressable
          className="mt-6 mx-5 flex-row items-center justify-center gap-2 rounded-xl border border-[#FF6B6B33] bg-surface px-4 py-4"
          onPress={async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert("Error", "An error occurred while signing out. Please try again.");
            }
          }}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text className="text-base font-semibold text-danger">Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView >
  );
}


