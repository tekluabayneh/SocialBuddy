import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'react-native';
import SocialAuth from '../hooks/UsesocialAuth';
const Signup = () => {
  const { handleSocialAuth, LoadingStrategy } = SocialAuth()
  const isLoading = LoadingStrategy !== null;
  return (
    <View className='flex-1 bg-background'>
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#0F0E17", "#1A1A2E", "#2D1B69", "#1A1A2E", "#0F0E17"]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={{ width: "100%", height: "100%" }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
      <SafeAreaView className='flex-1 justify-between'>
        <View>
          <View className='items-center pb-1'>
            <View className="w-16 h-16 rounded-[20px] bg-primary/15 items-center justify-center border border-primary/20">
              <Ionicons name="school" size={30} color="#A29BFE" />
            </View>
            <Text className='font-extrabold text-white text-3xl font-mono pb-1'> StudyBuddy</Text>
            <Text className='text-gray-500'> Learn together, grow together</Text>


            <View className='pt-5 items-center justify-center'>
              <Image
                style={{ width: 320, height: 350 }}
                source={require("../../../assets/images/auth.png")} />
            </View>


            <View className="flex-row flex-wrap justify-center gap-3 px-6 ">
              {[
                {
                  icon: "videocam" as const,
                  label: "Video Calls",
                  color: "#A29BFE",
                  bg: "bg-primary/12 border-primary/20",
                },
                {
                  icon: "chatbubbles" as const,
                  label: "Study Rooms",
                  color: "#FF6B6B",
                  bg: "bg-accent/12 border-accent/20",
                },
                {
                  icon: "people" as const,
                  label: "Find Partners",
                  color: "#00B894",
                  bg: "bg-accent-secondary/12 border-accent-secondary/20",
                },
              ].map((chip) => (
                <View
                  key={chip.label}
                  className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${chip.bg}`}
                >
                  <Ionicons name={chip.icon} color={chip.color} size={14} />
                  <Text className='text-white'>
                    {chip.label}
                  </Text>
                </View>
              ))}

            </View>


            <View className="flex-row items-center gap-3 my-1">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-foreground-subtle text-xs font-medium tracking-widest uppercase">
                Continue with
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>


            <View className='mt-6 flex-row gap-10 pb-3'>
              <Pressable
                onPress={() => !isLoading && handleSocialAuth("oauth_google")}
                className="size-20 rounded-2xl bg-white border border-border-light items-center justify-center active:scale-95"
              >
                <Image
                  source={require("../../../assets/images/google.png")}
                  style={{ width: 28, height: 28 }}
                  contentFit="contain"
                />
              </Pressable>

              <Pressable

                onPress={() => !isLoading && handleSocialAuth("oauth_github")}
                className="size-20 rounded-2xl bg-surface border border-border-light items-center justify-center active:scale-95"
              >
                <Ionicons name="logo-github" size={30} color="#FFFFFE" />
              </Pressable>

              <Pressable
                onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
                className="size-20 rounded-2xl bg-surface border border-border-light items-center justify-center active:scale-95"
              >
                <Ionicons name="logo-apple" size={30} color="#FFFFFE" />
              </Pressable>
            </View>
            <Text className="text-foreground-subtle text-[11px] text-center leading-4">
              By continuing, you agree to our{" "}
              <Text className="text-primary-light">Terms of Service</Text> and{" "}
              <Text className="text-primary-light">Privacy Policy</Text>
            </Text>
          </View>
        </View>

      </SafeAreaView >
    </View >
  )
}


export default Signup
