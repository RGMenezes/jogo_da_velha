import { Schema, Document, model } from "mongoose"

export interface UserInterface{
  userName: string;
  email: string;
  password: string;
  wage: number;
  theme ?: boolean;
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
  },
  wage: {
    type: Number, 
    require: true
  },
  theme: {
    type: Boolean,
    default: false
  }
})

export default model<UserModelInterface>('user', UserSchema)