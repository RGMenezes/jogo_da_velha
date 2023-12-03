import { ReactNode } from 'react'
import styles from './Button.module.css'

interface Button{ 
  children: ReactNode;
  type: 'button' | 'reset' | 'submit';
  handleOnClick ?: () => void;
}

export default function Button({ 
  children, 
  type, 
  handleOnClick 
}: Button ){


  return(
    <button className={styles.button} type={type} onClick={handleOnClick} >
      {children}
    </button>
  )
}