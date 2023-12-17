'use client'

import Loader from "@/components/loaders/Loader";
import { login } from "@/redux/user/slice";
import { useSession, signOut} from "next-auth/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "@/server/axios";

export default function RouterProtectionLayout({children}: {children: React.ReactNode}){
  const {data: session, status} = useSession()
  const dispatch = useDispatch()

  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    if(status == 'unauthenticated'){
      router.push('/login')
    }
  },[status, router])

  if(status == 'authenticated'){
      interface UserData{
        email: string
        userName: string
        _id: string
      }

      axios.post('/user', session.user).then((user: {data: UserData}) => {
        dispatch(login(user.data))
      }).catch((err) => {
        signOut();
        console.log(err)
        router.push('/login')
        alert('ERRO ao salvar usuário após login! Tente novamente...')
      })
      return (
        <>{children}</>
      )
  }else{
    return(
      <Loader/>
    )
  }
}