import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import User from '@/server/model/User';
import Database from '@/server/database/DataBase';

export async function POST( req: Request ) {
  await Database()
  const res: typeof NextResponse = NextResponse

  interface UserType{
    userName: string
    email: string
    password: string
  }

  const {userName, email, password}: UserType = await req.json()

  try {
    const userExists = await User.findOne({ userName: userName })
    if (userExists) {
      throw new Error('Nome de usuário já cadastrado!')
    }

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      throw new Error('E-mail já cadastrado!');
    }

    const newUser = new User({
      userName: userName,
      email: email,
      password: password
    })

    const salt: string = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    await newUser.save()

    return res.json('Sucesso ao registrar usuário!')
  } catch (err) {
    return res.json({ error: `${err}` })
  }

}