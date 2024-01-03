// import Database from "@/server/database/DataBase"
// import Game from "@/server/model/Game"

// export async function GET( req: Request ) {

//   async function sendEvent(data: Record<string, any>, writable: WritableStream<any>) {
//     const writer = writable.getWriter()

//     await writer.write(`data: ${JSON.stringify(data)}\n\n`).then().catch((err) => {
//       writer.abort()
//     }).finally(() => writer.releaseLock())
//   }

//   async function updateListGame(writable: WritableStream<any>){
//     await Game.find({}).then((res) => {
//       sendEvent({game: res}, writable)
//     }).catch(err => console.log(err))
//   }

//   try {
//     await Database()
//     if(!Game) throw new Error('Erro ao conectar-se com a collection')
//     const { readable, writable } = new TransformStream()
  
//     const changeStream = Game.watch()
  
//     changeStream.on('change', (change) => updateListGame(writable))
  
//     await updateListGame(writable)
    
//     return new Response(readable, {
//       status: 200,
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//       }
//     })
//   } catch (err) {
//     return new Response(`Error: ${err}`, {
//       status: 404,
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//       }
//     })
//   }
// }