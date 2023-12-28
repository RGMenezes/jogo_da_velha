import Database from "@/server/database/DataBase"
import Invites from "@/server/model/Invites"
import { NextResponse } from "next/server"

export async function POST( req: Request ) {
  await Database()
  const { inviteId, inviteResponse }: { userName: string, inviteId: string, inviteResponse: boolean } = await req.json()

  try {

    const inviteExist = await Invites.findById(inviteId)
    
    if(!inviteExist) throw new Error('Convite inixistente!')

    inviteExist.response = inviteResponse

    await inviteExist.save()

    return NextResponse.json('Resposta enviada!')
  } catch (err) {
    return NextResponse.json(`${err}`)
  }
}