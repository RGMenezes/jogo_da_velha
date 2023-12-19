import { NextResponse } from "next/server"

let messageGlobal: string;

export async function GET( req: Request) {
  const { readable, writable } = new TransformStream()

  const sendEvent = async (data: Record<string, any>) => {
    const writer = writable.getWriter()
    await writer.write(`data: ${JSON.stringify(data)}\n\n`)
    writer.releaseLock()
  }

  setInterval(() => {
    sendEvent({ message: `testando ${messageGlobal}` })
  }, 5000)
  
  const res =  new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })

  return res
}

export async function POST(req: Request) {
  const { message }: {message: string} = await req.json()
  
  messageGlobal = message

  return NextResponse.json("ação no servidor")
}