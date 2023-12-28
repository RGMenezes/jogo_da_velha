import Database from "@/server/database/DataBase"
import LogedUser from "@/server/model/LogedUser"
import mongoose from "mongoose"

export async function GET( req: Request ) {

  async function sendEvent(data: Record<string, any>, writable: WritableStream<any>) {
    const writer = writable.getWriter()

    await writer.write(`data: ${JSON.stringify(data)}\n\n`).then().catch((err) => {
      writer.abort()
    }).finally(() => writer.releaseLock())
  }

  async function updateListLogedUser(writable: WritableStream<any>){
    await LogedUser.find({}).then((res) => {
      sendEvent({logedUsers: res}, writable)
    }).catch(err => console.log(err))
  }

  try {
    Database()
    const db = mongoose.connection.db
    const collection = db.collection('logedusers')
    const { readable, writable } = new TransformStream()
  
    const changeStream = collection.watch()
  
    changeStream.on('change', (change) => updateListLogedUser(writable))
  
    await updateListLogedUser(writable)
    
    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    })
  } catch (err) {
    console.error(err)
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