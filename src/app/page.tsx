import Image from 'next/image'

import styles from './page.module.css'

import LinkButton from '@layout/LinkButton'
import Logo from '@public/logo-removebg-preview.png'

export default function Home() {
  return (
    <main className={styles.home}>
      <Image className={styles.image} alt='logo do site' src={Logo} />
      <h1>Jogo da Velha <br/> online</h1>

      <LinkButton href='/search_player'>
        Jogar
      </LinkButton>
    </main>
  )
}
