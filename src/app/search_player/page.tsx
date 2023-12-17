'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

import Button from '@form/Button'
import { useSelector } from 'react-redux'
import { User } from '@/redux/user/slice'

export default function SearchPlayer(){
  const router: AppRouterInstance = useRouter()
  const backPage = () :void => router.back()

  const user = useSelector((state: {userReducer: User}) => state.userReducer)

  return (
    <section className={styles.container}>
      <h1>Lista de jogadores online</h1>

      <div>
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