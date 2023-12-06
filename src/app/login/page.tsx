'use client'

import InputText from '@form/InputText'
import Button from "@form/Button"
import LinkButton from '@layout/LinkButton'
import styles from './page.module.css'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { FormEvent } from 'react';
import { FaArrowLeft } from "react-icons/fa";

export default function Login(){
  const router: AppRouterInstance = useRouter()


  const backPage = () :void => router.back()

  function submitLogin(e: FormEvent<HTMLFormElement>){
      e.preventDefault();

      const data = e.target as HTMLFormElement
      
      signIn("credentials", {email: data.email.value, password: data.password.value}).then((res) => {
          console.log(res)
          //router.push("/");
      }).catch((err) => {
          console.log(`Erro ao acessar o servidor: ${err}`);
      })
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