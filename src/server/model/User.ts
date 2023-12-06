import { Schema, Document, model, Model } from "mongoose"

export interface UserInterface{
  userName: string;
  email: string;
  password: string;
}

export interface UserModelInterface extends UserInterface, Document {}

let user: Model<UserModelInterface>


export const UserSchema: Schema = new Schema({
  userName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

try {
  user = model<UserModelInterface>('user')
} catch (error) {
  user = model<UserModelInterface>('user', UserSchema)
}

export default user