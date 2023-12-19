'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

import Button from '@form/Button'
import { useSelector } from 'react-redux'
import { User } from '@/redux/user/slice'
import { useEffect } from 'react'
import axios from '@/server/axios'

export default function SearchPlayer(){
  const router: AppRouterInstance = useRouter()
  const backPage = () :void => router.back()

  const user = useSelector((state: {userReducer: User}) => state.userReducer)

  function testeSSE(){
    axios.post('multiplayer', {message: 'qualquer coisa'}).then((res) => {
      console.log(`sucesso na conexão: ${res.data}`)
    }).catch(err => console.log(`erro na conexão: ${err}`))
  }

  useEffect(() => {
    const eventSource = new EventSource('/api/multiplayer')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data.message)
    }
  }, [])

  return (
    <section className={styles.container}>
      <h1>Lista de jogadores online</h1>

      <div onClick={testeSSE}>
        <h2>Info users</h2>
        <p>nome: {user.userName}</p>
        <p>email: {user.email}</p>
        <p>id: {user._id}</p>
      </div>

      <ul className={styles.lista}>
        <li className={styles.player}>Teste</li>
      </ul>

      <Button type='button' handleOnClick={backPage}>
        Voltar
      </Button>
    </section>
  )
}