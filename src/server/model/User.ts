import { Schema, Document, model } from "mongoose"

export interface UserInterface{
  userName: string;
  email: string;
  password: string;
}

export interface UserModelInterface extends UserInterface, Document {}

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

export default model<UserModelInterface>('user', UserSchema)