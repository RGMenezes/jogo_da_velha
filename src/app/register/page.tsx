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
import axios from '@/server/axios'

export default function Register(){
  const router: AppRouterInstance = useRouter()


  const backPage = () :void => router.back()

  function submitRegister(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      
      const data = e.target as HTMLFormElement

      if(data.password && data.confirmPassword){
        if(data.password.value === data.confirmPassword.value){

          interface NewUser{
            userName: string
            email: string
            password: string
          }

          const newUser: NewUser = {
            userName: data.userName.value,
            email: data.email.value,
            password: data.password.value
          }

          axios.post('/register', newUser).then((res) => {
            if(!res.data.error){
              router.push('/login')
            }else{
              alert(res.data.error)
            }
          }).catch((err) => {
            alert('Erro ao enviar dados!')
            console.error(err)
          })
        }else{
          alert('A senha deve ser a mesma nos dois campos!')
        }
      }
  };

  return (
    <div className={styles.container_form}>
      <form className={styles.form} onSubmit={submitRegister}>
        <div className={styles.backpage}>
          <Button handleOnClick={backPage} type='button' >
            <FaArrowLeft className={styles.backpage_icon} /> Voltar
          </Button>
        </div>

        <h1>Cadastro</h1>

        <div className={styles.container_input}>
          <InputText 
            text='Nome: '
            type='text'
            id='userName'
            name='userName'
            autoComplete='username'
            require={true}
          />
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
            autoComplete='new-password'
            minLength={8}
            require={true}
          />
          <InputText 
            text='Comfirmar senha: '
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            autoComplete='new-password'
            minLength={8}
            require={true}
          />
        </div>

        <div className={styles.container_action}>
          <LinkButton href='/login'>Login</LinkButton>
          <Button type='submit'>Confirmar</Button>
        </div>
      </form>
    </div>
  )
}