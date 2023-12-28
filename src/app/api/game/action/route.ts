import Database from "@/server/database/DataBase";
import Game, { GameModelInterface, PositionGame } from "@/server/model/Game";
import { UserModelInterface } from "@/server/model/User";
import { NextResponse } from "next/server";

export async function POST( req: Request){
  const {game, action, user}: {game: GameModelInterface, action: string, user: UserModelInterface} = await req.json()

  type GameArray = [string, string | null][]

  function victory(newGame: GameModelInterface){

    const resultArray = Object.entries(newGame.positionGame)

    if(resultArray[0][1] == resultArray[1][1] && resultArray[0][1] == resultArray[2][1] ) newGame.result = resultArray[0][1]
    else if(resultArray[3][1] == resultArray[4][1] && resultArray[3][1] == resultArray[5][1] ) newGame.result = resultArray[3][1]
    else if(resultArray[6][1] == resultArray[7][1] && resultArray[6][1] == resultArray[8][1] ) newGame.result = resultArray[6][1]
    else if(resultArray[0][1] == resultArray[3][1] && resultArray[0][1] == resultArray[6][1] ) newGame.result = resultArray[0][1]
    else if(resultArray[1][1] == resultArray[4][1] && resultArray[1][1] == resultArray[7][1] ) newGame.result = resultArray[1][1]
    else if(resultArray[2][1] == resultArray[5][1] && resultArray[2][1] == resultArray[8][1] ) newGame.result = resultArray[2][1]
    else if(resultArray[0][1] == resultArray[4][1] && resultArray[0][1] == resultArray[8][1] ) newGame.result = resultArray[0][1]
    else if(resultArray[2][1] == resultArray[4][1] && resultArray[2][1] == resultArray[6][1] ) newGame.result = resultArray[2][1]

    if(newGame.result == newGame.playerOne[1]) newGame.result = newGame.playerOne[0]
    else if(newGame.result == newGame.playerTwo[1]) newGame.result = newGame.playerTwo[0]

    return newGame
  }

  try {
    await Database()

    if(action == 'delete'){
      await Game.deleteOne({_id: game._id})
      throw new Error('Partida deletada!')
    }
    
    if(game.lastAction == '' && game.playerOne[0] != user.userName) throw new Error('Espere seu adversário jogar!')
    if(game.lastAction != '' && game.lastAction == user.userName) throw new Error('Espere seu adversário jogar!')
    
    const databaseGame = await Game.findById(game._id)

    if(!databaseGame) throw new Error('Partida não encontrada, jogue novamente!')
    if(databaseGame.result) throw new Error(`${databaseGame.result} venceu a partida!`)

    const arrayPositionGame:GameArray = Object.entries(databaseGame.positionGame)
    
    arrayPositionGame.map((item: [string, string | null]) => {
      if(item[0] == action && (item[1] == 'O' || item[1] == 'X')) throw new Error('Você não pode jogar neste lugar!')
      else if(item[0] == action && databaseGame.playerOne[0] == user.userName) {
        databaseGame.positionGame[item[0]] = databaseGame.playerOne[1]
        databaseGame.lastAction = databaseGame.playerOne[0]
      }
      else if(item[0] == action && databaseGame.playerTwo[0] == user.userName) {
        databaseGame.positionGame[item[0]] = databaseGame.playerTwo[1]
        databaseGame.lastAction = databaseGame.playerTwo[0]
      }
    })

    const newGame = new Game(victory(databaseGame))

    await newGame.save()

    return NextResponse.json('Jogada feita com sucesso!')
  } catch (err) {
    return NextResponse.json(`${err}`)
  }
}