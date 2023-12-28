'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

import Button from '@form/Button'
import { useSelector } from 'react-redux'
import { User } from '@/redux/user/slice'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import axios from '@/server/axios'
import { GameModelInterface } from '@/server/model/Game'

export default function SearchPlayer(){
  const router: AppRouterInstance = useRouter()

  const user = useSelector((state: {userReducer: User}) => state.userReducer)

  const [game, setGame] = useState<GameModelInterface>()

  const deleteGame = useCallback(() => {
    axios.post('/game/action', {game, action: 'delete', user}).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(`Erro ao conectar com o servidor: ${err}`)
    })
  }, [game, user])

  useEffect(() => {
    if(user._id){
      const eventSource = new EventSource('/api/game')

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if(data.game){
          data.game.map((item: GameModelInterface) => {
            if(item.playerOne[0] == user.userName || item.playerTwo[0] == user.userName){
              setGame(item)
              if(item.result){
                alert(`${item.result} ganho o jogo!`)
                deleteGame()
                router.back()
              }
            }else{
              alert('Você não está em uma partida! voltando para página anterior...')
              router.back()
            }
          })
        }
      }
    }
  }, [user, router, deleteGame])

  function gameActionUser(action: string){
    axios.post('/game/action', {game, action, user}, {timeout: 10000}).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.error(`Erro ao conectar com o servidor: `)
      console.error(err)
    })
  }

  return (
    <>{game && <section className={styles.container}>
      <header className={styles.header}>
        <h1>Jogo da velha</h1>
        <p>{game.playerOne[1]} {game.playerOne[0]} vs {game.playerTwo[0]} {game.playerTwo[1]}</p>
      </header>

      <main className={styles.container_action}>
        <ul className={styles.line_box_action}>
          <li className={styles.box_action} onClick={() => gameActionUser('a1')}>{game.positionGame.a1}</li>
          <li className={styles.box_action} onClick={() => gameActionUser('a2')}>{game.positionGame.a2}</li>
          <li className={styles.box_action} onClick={() => gameActionUser('a3')}>{game.positionGame.a3}</li>
        </ul>

        <ul className={styles.line_box_action}>
          <li className={styles.box_action} onClick={() => gameActionUser('b1')}>{game.positionGame.b1}</li>
          <li className={styles.box_action} onClick={() => gameActionUser('b2')}>{game.positionGame.b2}</li>
          <li className={styles.box_action} onClick={() => gameActionUser('b3')}>{game.positionGame.b3}</li>
        </ul>
        
        <ul className={styles.line_box_action}>
          <li className={styles.box_action} onClick={() => gameActionUser('c1')}>{game.positionGame.c1}</li>
          <li className={styles.box_action} onClick={() => gameActionUser('c2')}>{game.positionGame.c2}</li>
          <li className={styles.box_action} onClick={() => gameActionUser('c3')}>{game.positionGame.c3}</li>
        </ul>
      </main>
    </section> }</>
  )
}