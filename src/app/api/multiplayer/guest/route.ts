import Database from "@/server/database/DataBase"
import Invites from "@/server/model/Invites"
import { NextResponse } from "next/server"

export async function GET( req: Request ) {

  try {
    await Database()
    if(!Invites) throw new Error('Erro ao conectar-se com a collection')

    const listInvites = await Invites.find({})
    
    return NextResponse.json(listInvites)
  } catch (err) {
    console.error(err)
    return NextResponse.json(null)
  }
}