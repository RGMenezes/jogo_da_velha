'use client'

import InputText from '@form/InputText'
import Button from "@form/Button"
import styles from './page.module.css'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { FormEvent } from 'react';

export default function Login(){
  const router: AppRouterInstance = useRouter();

  function submitLogin(e: FormEvent<HTMLFormElement>){
      e.preventDefault();

      const form = e.target as HTMLFormElement
      
      signIn("credentials", {email: form.email.value, password: form.password.value}).then((res) => {
          router.push("/");
      }).catch((err) => {
          console.log(`Erro ao acessar o servidor: ${err}`);
      })
  };

  return (
    <div className={styles.container_form}>
      <form className={styles.form} onSubmit={submitLogin}>
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

        <Button type='submit'>Entrar</Button>
      </form>
    </div>
  )
}