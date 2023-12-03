import { ReactNode } from 'react'
import Link from 'next/link'

import styles from './LinkButton.module.css'

export default function LinkButton({children, href}: {children: ReactNode, href: string}){
  return (
    <Link className={styles.button} href={href}>
      {children}
    </Link>
  )
}