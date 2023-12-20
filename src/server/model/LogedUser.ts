import mongoose, { Schema, Document, model, Model, ObjectId } from "mongoose"

export interface LogedUserInterface{
  user: string;
}

export interface LogedUserModelInterface extends LogedUserInterface, Document {}

let logedUser: Model<LogedUserModelInterface>

export const LogedUserSchema: Schema = new Schema({
  user: {
    type: String,
    require: true
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
  expireAfterSeconds: 1800
})

try {
  logedUser = model<LogedUserModelInterface>('logedUser')
} catch (error) {
  logedUser = model<LogedUserModelInterface>('logedUser', LogedUserSchema)
}

export default logedUser