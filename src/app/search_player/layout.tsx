'use client'

import { UserData, login } from "@/redux/user/slice";
import { useSession, signOut} from "next-auth/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "@/server/axios";
import { handleLoading } from "@/redux/tool/slice";
export default function RouterProtectionLayout({children}: {children: React.ReactNode}){
  const {data: session, status} = useSession()
  const dispatch = useDispatch()

  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    if(status == 'unauthenticated'){
      dispatch(handleLoading({loading: false}))
      router.push('/login')
    }
    if(status == 'loading'){
      dispatch(handleLoading({loading: true}))
    }
  },[status, dispatch, router])

  if(status == 'authenticated'){

      axios.post('/user', session.user).then((user: {data: UserData}) => {
        dispatch(login(user.data))
        dispatch(handleLoading({loading: true}))
      }).catch((err) => {
        dispatch(handleLoading({loading: true}))
        signOut();
        console.log(err)
        router.push('/login')
        alert('ERRO ao salvar usuário após login! Tente novamente...')
      }).finally(() => dispatch(handleLoading({loading: false})))
      return (
        <>{children}</>
      )
  }else{
    return <></>
  }
}