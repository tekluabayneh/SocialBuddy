
import { StreamChat } from "stream-chat";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY as string
const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY as string


export default async function POST(req: Request, res: Response) {
  const client = StreamChat.getInstance(API_KEY, STREAM_SECRET_KEY)

  // @ts-expect-error user info does exist in body
  const { userId, name, image } = req?.body
  if (!userId) {
    Response.json({ error: "user id missing" }, { status: 400 })
  }

  try {
    await client.upsertUser({
      id: userId,
      name: name || "Guest",
      image: image
    })
    Response.json({ success: "frutful" }, { status: 200 })
    return
  } catch (error) {
    Response.json({ success: "failed" }, { status: 500 })
  }

}


