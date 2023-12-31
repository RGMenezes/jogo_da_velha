'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

import Button from '@form/Button'
import { useSelector } from 'react-redux'
import { User } from '@/redux/user/slice'
import { useCallback, useEffect, useState } from 'react'
import axios from '@/server/axios'
import { LogedUserModelInterface, LogedUserSchema } from '@/server/model/LogedUser'
import invites, { InviteModelInterface } from '@/server/model/Invites'
import pusher from '@/pusher/client'

export default function SearchPlayer(){
  const router: AppRouterInstance = useRouter()
  const backPage = () :void => router.back()
  const [listUsers, setListUsers] = useState<LogedUserModelInterface[]>([])
  const [listInvites, setListInvites] = useState<InviteModelInterface[]>([])  

  const user = useSelector((state: {userReducer: User}) => state.userReducer)

  const updateInvite = useCallback((invites: InviteModelInterface[]) => {
    if(invites){
      const arrayInvites: InviteModelInterface[] = []
      invites.map((item: InviteModelInterface) => {
        if(item.sender == user.userName){
          if(item.response === undefined ){
            console.log(`sem resposta ao convite...`)
          }else if(item.response){
            console.log(`${item.recipient} aceitou o seu convite, indo para partida!`)
            router.push('/search_player/game')
            inviteDelete(item)
          }else{
            console.log(`${item.recipient} recusou o seu convite!`)
            inviteDelete(item)
          }
        }
        if(item.recipient == user.userName){
          if(item.response === undefined ){
            arrayInvites.push(item)
          }else if(item.response){
            console.log(`Você aceitou o convite de ${item.sender}, indo para partida!`)
            router.push('/search_player/game')
          }else{
            console.log(`Você recusou o convite de ${item.sender}!`)
          }
        }
      })
      setListInvites(arrayInvites)
    }
  }, [router, user.userName])

  useEffect(() => {
    axios.get('/multiplayer').then((res) => {
      setListUsers(res.data)
    }).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if(pusher){
      const channel = pusher.subscribe('game')

      channel.bind('logedUser', function(data: LogedUserModelInterface[]) {
        setListUsers(data)
      })
    }
  },[])

  useEffect(() => {
    axios.get('/multiplayer/guest').then((res) => {
      updateInvite(res.data)
    }).catch(err => console.error(err))
  }, [updateInvite])

  useEffect(() => {
    if(pusher){
      const channel = pusher.subscribe('game')

      channel.bind('invite', (data: InviteModelInterface[]) => updateInvite(data))
    }
  }, [updateInvite])

  function userOnline() {
    if(user._id){
      axios.post('/multiplayer/online', {userId: user._id}).then((res) => {
        console.log(res.data)
      }).catch(err => {
        console.error(err)
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
        console.log(res.data)
      }).catch(err => {
        console.error(err)
        alert('Não foi possível conectar com o servidor!')
      })
    }
  }

  function inviteResponse(res: boolean, id: string){
    axios.post('/multiplayer/response', {inviteId: id, inviteResponse: res}).then((res) => {
      console.log(res.data)
    }).catch(err => {
      console.error(err)
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