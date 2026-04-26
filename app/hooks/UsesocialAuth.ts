import { useSSO } from "@clerk/expo"
import { useState } from "react"
import { Alert } from "react-native"


const SocialAuth = () => {
  const [LoadingStrategy, setLoadingStrategy] = useState<string | null>(null)
  const { startSSOFlow } = useSSO()

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple" | "oauth_github") => {
    try {

      const { createdSessionId, setActive } = await startSSOFlow({ strategy })
      if (LoadingStrategy) return null

      setLoadingStrategy(strategy)
      console.log(createdSessionId)
      if (!createdSessionId || !setActive) {
        const provider = strategy == "oauth_google" ? "oauth_google" : strategy === "oauth_github" ? "oauth_github" : "oauth_github"
        Alert.alert(
          "Sign-in incomplete",
          `${provider} sign-in did not complete. Please try again.`,
        );
        return
      }

      await setActive({ session: createdSessionId })

    } catch (err) {
      console.log(err)
      const provider = strategy == "oauth_google" ? "oauth_google" : strategy === "oauth_github" ? "oauth_github" : "oauth_github"
      Alert.alert("Error", `Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setLoadingStrategy(null)
    }

  }

  return { handleSocialAuth, LoadingStrategy }
}


export default SocialAuth

