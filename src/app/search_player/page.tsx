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
import { InviteModelInterface } from '@/server/model/Invites'
import pusher from '@/pusher/client'

export default function SearchPlayer(){
  const router: AppRouterInstance = useRouter()
  const backPage = () :void => router.back()
  const [listUsers, setListUsers] = useState([])
  const [listInvites, setListInvites]: any[] = useState([])  

  const user = useSelector((state: {userReducer: User}) => state.userReducer)

  useEffect(() => {

    axios.get('/multiplayer').then((res) => {
      console.log(res.data)
      console.log('axios rota multiplayer')
    }).catch(err => console.error(err))
    
    if(pusher){
      const channel = pusher.subscribe('game')

      channel.bind('teste', function(data: any) {
        setListUsers(data)
      })
      
      return () => {
        channel.unbind()
        if(pusher) pusher.disconnect()
      }
    }
  }, [])

  // useEffect(() => {
  //   const eventSource = new EventSource('/api/multiplayer/guest')

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //     if(data.invites){
  //       const invites = data.invites
  //       const arrayInvites: object[] = []
  //       invites.map((item: InviteModelInterface) => {
  //         if(item.sender == user.userName){
  //           if(item.response === undefined ){
  //             console.log(`sem resposta ao convite...`)
  //           }else if(item.response){
  //             alert(`${item.recipient} aceitou o seu convite, indo para partida!`)
  //             router.push('/search_player/game')
  //             inviteDelete(item)
  //           }else{
  //             alert(`${item.recipient} recusou o seu convite!`)
  //             inviteDelete(item)
  //           }
  //         }
  //         if(item.recipient == user.userName){
  //           if(item.response === undefined ){
  //             arrayInvites.push(item)
  //           }else if(item.response){
  //             alert(`Você aceitou o convite de ${item.sender}, indo para partida!`)
  //             router.push('/search_player/game')
  //           }else{
  //             console.log(`Você recusou o convite de ${item.sender}!`)
  //           }
  //         }
  //       })
  //       setListInvites(arrayInvites)
  //     }
  //   }
  // }, [user.userName, router])


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

  function inviteParty(inviteAdversary: string){
    if(user.userName == inviteAdversary){
      alert('Você não pode jogar contra você mesmo.')
    }else{
      axios.post('/multiplayer/invite', {adversary: inviteAdversary, user: user.userName}).then((res) => {
        alert(res.data)
      }).catch(err => {
        console.log(err)
        alert('Não foi possível conectar com o servidor!')
      })
    }
  }

  function inviteResponse(res: boolean, id: string){
    axios.post('/multiplayer/response', {inviteId: id, inviteResponse: res}).then((res) => {
      alert(res.data)
    }).catch(err => {
      console.log(err)
      alert('Não foi possível conectar com o servidor!')
    })
  }

  function inviteDelete(invite: InviteModelInterface){
    axios.delete(`/multiplayer/invite/${JSON.stringify(invite)}`).then((res) => {
      console.log(res.data)
    }).catch(err => {
      console.error(err)
      console.error('Não foi possível deletar o convite!')
    })
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

      <ul className={styles.list}>
        {listUsers.map((item: LogedUserModelInterface, index: number) => (
          <li key={`UsuarioLogado${index}`} value={item._id} onClick={() => inviteParty(item.user)} className={styles.player}>{item.user}</li>
        ))}
      </ul>

      {listInvites[0] && (
        <ol className={styles.container_invites}>
          <h3>Convites</h3>
          {listInvites.map((item: InviteModelInterface, index: number) => (
            <div key={`Contive${index}`}>{
                item.response == undefined ?
                <li className={styles.invite}>
                  <h4>{item.sender}</h4>
                  <div className={styles.container_x}>
                    <Button handleOnClick={() => inviteResponse(false, item._id)} type='button'>Rejeitar</Button>
                    <Button handleOnClick={() => inviteResponse(true, item._id)}type='button'>Aceitar</Button>
                  </div>
                </li>
              : 
                <p>Você já respondeu todos os convites!</p>
              }</div>
          ))}
        </ol>
      )}

      <Button type='button' handleOnClick={backPage}>
        Voltar
      </Button>
    </section>
  )
}