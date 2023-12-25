import Database from "@/server/database/DataBase"
import Invites from "@/server/model/Invites"
import mongoose from "mongoose"

export async function GET( req: Request ) {

  async function sendEvent(data: Record<string, any>, writable: WritableStream<any>) {
    const writer = writable.getWriter()

    await writer.write(`data: ${JSON.stringify(data)}\n\n`).then().catch((err) => {
      writer.abort()
    }).finally(() => writer.releaseLock())
  }

  async function updateListInvites(writable: WritableStream<any>){
    await Invites.find({}).then((res) => {
      sendEvent({invites: res}, writable)
    }).catch(err => console.log(err))
  }

  try {
    Database()
    const db = mongoose.connection.db
    const collection = db.collection('logedusers')
    const { readable, writable } = new TransformStream()
  
    const changeStream = collection.watch()
  
    changeStream.on('change', (change) => updateListInvites(writable))
  
    updateListInvites(writable)
    
    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    })
  } catch (err) {
    return new Response(`Error: ${err}`, {
      status: 404,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    })
  }
}