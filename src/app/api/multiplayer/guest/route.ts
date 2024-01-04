import pusher from "@/pusher/server"
import Database from "@/server/database/DataBase"
import Invites from "@/server/model/Invites"
import { NextResponse } from "next/server"

export async function GET( req: Request ) {

  async function updateListInvites(){
    await Invites.find({}).then((res) => {
      if(pusher){
        pusher.trigger('game', 'invites', res)
      }
    }).catch(err => console.log(err))
  }

  try {
    await Database()
    if(!Invites) throw new Error('Erro ao conectar-se com a collection')
  
    const changeStream = Invites.watch()
  
    changeStream.on('change', (change) => updateListInvites())
  
    await updateListInvites()
    
    return NextResponse.json('Lista de convites atualizada.')
  } catch (err) {
    console.error(err)
    return NextResponse.json('Houve um erro ao atualizar lista de convites!')
  }
}