import { Schema, Document, model, Model } from "mongoose"

export interface InviteInterface{
  sender: string
  recipient: string
  response?: boolean 
}

export interface InviteModelInterface extends InviteInterface, Document {}

let invites: Model<InviteModelInterface>

export const InviteSchema: Schema = new Schema({
  sender: {
    type: String,
    require: true
  },
  recipient: {
    type: String,
    require: true
  },
  response: {
    type: Boolean
  }
}, {
  timestamps: true,
  expireAfterSeconds: 60
})

try {
  invites = model<InviteModelInterface>('invites')
} catch (error) {
  invites = model<InviteModelInterface>('invites', InviteSchema)
}

export default invites