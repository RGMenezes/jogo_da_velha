import InputText from '@form/InputText'
import Button from "@form/Button"
import styles from './page.module.css'

export default function Login(){
  return (
    <div className={styles.container_form}>
      <form className={styles.form} method='POST' action='/api/auth'>
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