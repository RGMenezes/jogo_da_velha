import { Schema, Document, model, Model } from "mongoose"

export interface GameInterface{
  playerOne: [userName: string, playType: string]
  playerTwo: [userName: string, playType: string]
  positionsGame?: [...string[]]
  result?: boolean
}

export interface GameModelInterface extends GameInterface, Document {}

let game: Model<GameModelInterface>

export const GameSchema: Schema = new Schema({
  playerOne: {
    type: Array,
    require: true
  },
  playerTwo: {
    type: Array,
    require: true
  },
  positionGame: {
    type: Array
  },
  result:{
    type: Boolean
  }
})

try {
  game = model<GameModelInterface>('game')
} catch (error) {
  game = model<GameModelInterface>('game', GameSchema)
}

export default game