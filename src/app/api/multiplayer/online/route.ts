import Database from "@/server/database/DataBase"
import LogedUser from "@/server/model/LogedUser"
import User from "@/server/model/User"
import { NextResponse } from "next/server"

export async function POST( req: Request ) {
  await Database()
  const { userId }: { userId: string } = await req.json()

  try {
    const existLogedUser = await LogedUser.findById(userId)
    const user = await User.findById(userId)

    if(existLogedUser) throw new Error('Usuário já está online!')
    if(!user) throw new Error('Não encontramos o usuário, tente novamente!')

    const newLogedUser = new LogedUser({
      user: user.userName,
      _id: user._id
    })

    await newLogedUser.save()

    return NextResponse.json('Usuário conectado com sucesso!')
  } catch (err) {
    return NextResponse.json(`${err}`)
  }
}