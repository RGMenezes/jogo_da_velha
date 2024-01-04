import Database from "@/server/database/DataBase"
import Game from "@/server/model/Game"
import { NextResponse } from "next/server"

export async function GET( req: Request ) {

  try {
    await Database()
    if(!Game) throw new Error('Erro ao conectar-se com a collection')

    const gameActions = await Game.find({})
    
    return NextResponse.json(gameActions)
  } catch (err) {
    console.error(err)
    return NextResponse.json(null)
  }
}