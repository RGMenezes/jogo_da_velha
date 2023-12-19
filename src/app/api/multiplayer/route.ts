import { NextResponse } from "next/server"

let messageGlobal: string;

export async function GET( req: Request) {
  const { readable, writable } = new TransformStream()

  const sendEvent = (data: Record<string, any>) => {
    writable.getWriter().write(`data: ${JSON.stringify(data)}\n\n`)
  }

  setTimeout(() => {
    sendEvent({ message: `testando ${messageGlobal}` })
  }, 10000)
  
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