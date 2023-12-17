'use client'

import InputText from '@form/InputText'
import Button from "@form/Button"
import LinkButton from '@layout/LinkButton'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { FormEvent } from 'react';
import { FaArrowLeft } from "react-icons/fa"
import { useEffect } from 'react'

export default function Login(){
  const router: AppRouterInstance = useRouter()
  const {data: session, status} = useSession()

  const backPage = () :void => router.back()

  useEffect(() => {
    if(status == 'authenticated'){
      router.push('/search_player')
    }
  },[status, router])

  function submitLogin(e: FormEvent<HTMLFormElement>){
      e.preventDefault();

      const data = e.target as HTMLFormElement

      if(status == 'unauthenticated'){
        signIn("credentials", {email: data.email.value, password: data.password.value, redirect: false}).then((res) => {
          if(res){
            if(res.ok){
              router.push('/search_player')
            }else{
              alert(res.error)
            }
          }else{
            alert(new Error('Algo inesperado aconteceu, tente novamente!'))
          }
        }).catch((err) => {
            alert(new Error(`Erro ao acessar o servidor: ${err}`))
        })
      }else{
        alert('Você ainda esta logado!')
      }
  };

  return (
    <div className={styles.container_form}>
      <form className={styles.form} onSubmit={submitLogin}>
        <div className={styles.backpage} >
          <Button handleOnClick={backPage} type='button' >
            <FaArrowLeft className={styles.backpage_icon} /> Voltar
          </Button>
        </div>

        <h1>Login</h1>

        <div className={styles.container_input}>
          <InputText 
            text='Email: '
            type='email'
            id='email'
            name='email'
            autoComplete='email'
            placeholder='exemplo@exemplo.ex'
            require={true}
          />
          <InputText 
            text='Senha: '
            type='password'
            id='password'
            name='password'
            autoComplete='current-password'
            minLength={8}
            require={true}
          />
        </div>

        <div className={styles.container_action}>
          <LinkButton href='/register'>Cadastrar-se</LinkButton>
          <Button type='submit'>Entrar</Button>
        </div>
      </form>
    </div>
  )
}