'use client'

import Loader from "@/components/loaders/Loader";
import { useSession } from "next-auth/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouterProtectionLayout({children}: {children: React.ReactNode}){
  const {data: session, status} = useSession()

  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    if(status == 'unauthenticated'){
      router.push('/login')
    }
  },[status, router])

  if(status == 'authenticated'){
      return (
        <>{children}</>
      )
  }else{
    return(
      <Loader/>
    )
  }
}