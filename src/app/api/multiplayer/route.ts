import Database from "@/server/database/DataBase"
import LogedUser from "@/server/model/LogedUser"
import { NextResponse } from "next/server"

export async function GET( req: Request ) {

  try {
    await Database()
    if(!LogedUser) throw new Error('Erro ao conectar-se com a collection')

    const listLogedUsers = await LogedUser.find({})
    
    return NextResponse.json(listLogedUsers)
  } catch (err) {
    console.error(err)
    return NextResponse.json(null)
  }
}