import React, { useEffect, useRef } from "react"
import { useUser } from '@clerk/expo';
import { FullScreenLoader } from "./FullScreenLoader";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import { studyBuddyTheme } from "../lib/theme";
type UserResource = NonNullable<ReturnType<typeof useUser>["user"]>;
const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY as string


const SynchUserStream = async (user: UserResource) => {
  try {
    const res = await fetch("http://localhost:8081/sync-user ", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: user?.username || user?.fullName,
        image: user?.imageUrl,
        id: user?.id,
      })
    })
    const data = res.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }

}


const Chatclient = ({ children, user }: { children: React.ReactNode, user: UserResource }) => {
  const syncRef = useRef(false)
  useEffect(() => {
    if (!syncRef.current) {
      syncRef.current = true
      SynchUserStream(user)
    }

  }, [user])

  const TokenProvider = async () => {
    try {
      const res = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          userId: user?.id,
        })
      })
      const data = res.json()
      console.log(data)
      // @ts-expect-error toke does provided by teh caller
      return data.token
    } catch (error) {
      console.log(error)
    }
  }


  const chatclient = useCreateChatClient({
    apiKey: STREAM_SECRET_KEY,
    tokenOrProvider: TokenProvider,
    userData: {
      id: user.id,
      name: user.username || user?.fullName || user.emailAddresses[0].emailAddress.split("@")[0],
      image: user.imageUrl
    }
  })

  if (!chatclient) {
    return <FullScreenLoader message="Loading chat..." />
  }


  return (
    <OverlayProvider value={{ style: studyBuddyTheme }}>
      <Chat client={chatclient} style={studyBuddyTheme}>
        {children}
      </Chat>
    </OverlayProvider >

  )
}

export const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <FullScreenLoader message="Loading chat..." />
  }

  if (!user) return <> {children} </>
  return (
    <Chatclient user={user}> {children} </Chatclient>
  )
}
