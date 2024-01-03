import Database from "@/server/database/DataBase"
import LogedUser from "@/server/model/LogedUser"
import pusher from "@/pusher/server"
import { NextResponse } from "next/server"

export async function GET( req: Request ) {

  async function updateListLogedUser(){
    await LogedUser.find({}).then((res) => {
      if(pusher){
        pusher.trigger('game', 'teste', res)
      }
    }).catch(err => console.log(err))
  }

  try {
    await Database()
    if(!LogedUser) throw new Error('Erro ao conectar-se com a collection')
  
    const changeStream = LogedUser.watch()
  
    changeStream.on('change', (change) => updateListLogedUser())
  
    await updateListLogedUser()
    
    return NextResponse.json('foi')
  } catch (err) {
    console.error(err)
    return NextResponse.json('não foi')
  }
}