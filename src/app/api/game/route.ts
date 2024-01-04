import pusher from "@/pusher/server"
import Database from "@/server/database/DataBase"
import Game from "@/server/model/Game"
import { NextResponse } from "next/server"

export async function GET( req: Request ) {

  async function updateListGame(){
    await Game.find({}).then((res) => {
      if(pusher){
        pusher.trigger('game', 'game', res)
      }
    }).catch(err => console.log(err))
  }

  try {
    await Database()
    if(!Game) throw new Error('Erro ao conectar-se com a collection')
  
    const changeStream = Game.watch()
  
    changeStream.on('change', (change) => updateListGame())
  
    await updateListGame()
    
    return NextResponse.json('Lista de ações do jogo atualizada.')
  } catch (err) {
    console.error(err)
    return NextResponse.json('Houve um erro ao atualizar lista de ações do jogo!')
  }
}