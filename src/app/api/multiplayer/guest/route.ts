import Database from "@/server/database/DataBase"
import Invites from "@/server/model/Invites"

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
    await Database()
    if(!Invites) throw new Error('Erro ao conectar-se com a collection')

    const { readable, writable } = new TransformStream()
  
    const changeStream = Invites.watch()
  
    changeStream.on('change', (change) => updateListInvites(writable))
  
    await updateListInvites(writable)
    
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