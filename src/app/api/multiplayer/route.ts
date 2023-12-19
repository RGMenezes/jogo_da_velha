import { NextRequest, NextResponse } from "next/server";


export async function GET( req: typeof NextRequest) {
  const res: typeof NextResponse = NextResponse
  
  return res.json({message: 'Testando (SSE)'})
}