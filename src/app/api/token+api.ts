
import { StreamChat } from "stream-chat";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY as string
const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY as string

export default async function POST(req: Request, res: Response) {
  const client = StreamChat.getInstance(API_KEY, STREAM_SECRET_KEY)

  const body = await req.json()

  const userID = body.userId

  if (!userID) {
    Response.json({ error: "user is missing" }, { status: 400 })
    return
  }


  const token = client.createToken(userID)


  Response.json({ token: token }, { status: 200 })

}


