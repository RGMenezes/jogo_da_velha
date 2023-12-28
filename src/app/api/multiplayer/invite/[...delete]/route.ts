import Database from "@/server/database/DataBase"
import game, { defaultPositionGame } from "@/server/model/Game"
import invites, { InviteModelInterface } from "@/server/model/Invites"
import logedUser from "@/server/model/LogedUser"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { NextResponse } from "next/server"

export async function DELETE( req: Request, { params }: { params: Params } ) {
  Database()
  const invite: InviteModelInterface = JSON.parse(params.delete[0])

  try {
    const existInvite = await invites.findById(invite._id)
    if(!existInvite) throw new Error('Convite inexistente!')

    const onlineSender = await logedUser.find({user: invite.sender})
    if(!onlineSender) throw new Error('Você precisa estar online para jogar!')

    const onlineRecipient = await logedUser.find({user: invite.recipient})
    if(!onlineRecipient) throw new Error('Adversário não está online no momento!')

    if(invite.response){
      const newGame = new game({
        playerOne: [invite.sender, 'X'],
        playerTwo: [invite.recipient, 'O'],
        positionGame: defaultPositionGame,
        lastAction: ''
      })
      
      await newGame.save()
    }
    
    await invites.deleteOne({_id: invite._id})

    return NextResponse.json('Convite deletado!')
  } catch (err) {
    return NextResponse.json(`${err}`)
  }
}