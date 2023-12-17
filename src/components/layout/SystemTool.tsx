'use client'

import { useSelector } from 'react-redux'
import { Tool } from '@/redux/tool/slice'
import Loader from '../loaders/Loader'
import { useEffect, useState } from 'react'

export default function SystemTool({
  children,
}: {
  children: React.ReactNode
}){
  const { loading } = useSelector((state: {toolReducer: Tool}) => state.toolReducer)
  const [handleLoading, setHandleLoading] = useState(loading)

  useEffect(() => {
    setHandleLoading(loading)
  }, [loading])

  return (
    <>
      {handleLoading && <Loader />}
      {children}    
    </>
  )
}