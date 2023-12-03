'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

import Button from '@form/Button'

export default function SearchPlayer(){
  const router: AppRouterInstance = useRouter()
  const pageBack = () :void => router.back()
  return (
    <section className={styles.container}>
      <h1>Lista de jogadores online</h1>

      <ul className={styles.lista}>
        <li className={styles.player}>Teste</li>
      </ul>

      <Button type='button' handleOnClick={pageBack}>
        Voltar
      </Button>
    </section>
  )
}