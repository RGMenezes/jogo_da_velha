'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

import Button from '@form/Button'
import { useSelector } from 'react-redux'
import { User } from '@/redux/user/slice'
import { useEffect, useState } from 'react'
import axios from '@/server/axios'
import { LogedUserModelInterface } from '@/server/model/LogedUser'

export default function SearchPlayer(){
  const router: AppRouterInstance = useRouter()
  const backPage = () :void => router.back()
  const [listUsers, setListUsers] = useState([])  

  const user = useSelector((state: {userReducer: User}) => state.userReducer)

  useEffect(() => {
    const eventSource = new EventSource('/api/multiplayer')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if(data.logedUsers){
        setListUsers(data.logedUsers)
      }
      console.log(data.message)
    }
  }, [])

  function userOnline() {
    if(user._id){
      axios.post('/multiplayer/online', {userId: user._id}).then((res) => {
        alert(res.data)
      }).catch(err => {
        console.log(err)
        alert('Não foi possível conectar com o servidor!')
      })
    }else{
      alert('Usuário não detectado tente novamente!')
    }
  }

  return (
    <section className={styles.container}>
      <h1>Lista de jogadores online</h1>

      <div className={styles.profile}>
        <h2>{user.userName}</h2>
        <p>{user.email}</p>
        <Button type='button' handleOnClick={userOnline}>
          Ficar online
        </Button>
      </div>

      <ul className={styles.lista}>
        {listUsers.map((item: LogedUserModelInterface, index) => <li key={`UsuarioLogado${index}`} value={item._id} className={styles.player}>{item.user}</li>)}
      </ul>

      <Button type='button' handleOnClick={backPage}>
        Voltar
      </Button>
    </section>
  )
}