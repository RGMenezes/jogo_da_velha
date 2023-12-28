import { Schema, Document, model, Model } from "mongoose"

export interface GameInterface{
  playerOne: [userName: string, playType: string]
  playerTwo: [userName: string, playType: string]
  positionGame: PositionGame
  lastAction: string
  result: string | null
}

export interface PositionGame{
  a1: string | null
  a2: string | null
  a3: string | null
  b1: string | null
  b2: string | null
  b3: string | null
  c1: string | null
  c2: string | null
  c3: string | null
  [key: string]: string | null
}

export interface GameModelInterface extends GameInterface, Document {}

export const defaultPositionGame: PositionGame = {
  a1: null,
  a2: null,
  a3: null,
  b1: null,
  b2: null,
  b3: null,
  c1: null,
  c2: null,
  c3: null,
}

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
    type: Object,
    default: defaultPositionGame
  },
  lastAction:{
    type: String
  },
  result:{
    type: String
  }
})

try {
  game = model<GameModelInterface>('game')
} catch (error) {
  game = model<GameModelInterface>('game', GameSchema)
}

export default game