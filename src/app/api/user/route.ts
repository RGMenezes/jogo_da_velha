import { NextResponse } from 'next/server'
import User from '@/server/model/User';
import Database from '@/server/database/DataBase';

export async function POST( req: Request ) {
  await Database()
  const res: typeof NextResponse = NextResponse

  const { email }: {email: string} = await req.json()

  try {
    const user = await User.findOne({ email: email })
    if (user) {
      const newUser = {
        email: user.email,
        userName: user.userName,
        _id: user._id
      }
      return res.json(newUser)
    }else{
      throw new Error('Usuário não encontrado')
    }

    
  } catch (err) {
    return Promise.reject(new Error(`${err}`))
  }
}