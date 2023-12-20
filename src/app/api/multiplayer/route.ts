import Database from "@/server/database/DataBase"
import LogedUser from "@/server/model/LogedUser"
import mongoose from "mongoose"

export async function GET( req: Request) {
  Database()
  const db = mongoose.connection.db
  const collection = db.collection('logedusers')

  const { readable, writable } = new TransformStream()

  const sendEvent = async (data: Record<string, any>) => {
    const writer = writable.getWriter()
    await writer.write(`data: ${JSON.stringify(data)}\n\n`)
    writer.releaseLock()
  }

  function updateListLogedUser(){
    LogedUser.find({}).then((res) => {
      sendEvent({logedUsers: res})
    }).catch(err => console.log(err))
  }

  const changeStream = collection.watch()

  changeStream.on('change', (change) => {
    console.log(change)
    updateListLogedUser()
  })

 updateListLogedUser()
  
  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}