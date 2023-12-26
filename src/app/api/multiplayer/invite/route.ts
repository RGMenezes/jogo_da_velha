import Database from "@/server/database/DataBase"
import invites from "@/server/model/Invites"
import LogedUser from "@/server/model/LogedUser"
import { NextResponse } from "next/server"

export async function POST( req: Request ) {
  Database()
  const { adversary, user }: { adversary: string, user: string } = await req.json()

  try {

    const adversaryExists = await LogedUser.find({user: adversary})
    
    if(!adversaryExists) throw new Error('Adversario não está online!')

    const newInvite = new invites({
      sender: user,
      recipient: adversary,
    })

    await newInvite.save()

    return NextResponse.json('Convite enviado!')
  } catch (err) {
    return NextResponse.json(`${err}`)
  }
}