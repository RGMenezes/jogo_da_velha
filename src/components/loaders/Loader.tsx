import styles from './Loader.module.css'

export default function Loader(){
  return (
    <div className={styles.container_loader}>
      <svg className={styles.loader} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="30" fill="none" />
        <line x1="20" y1="20" x2="80" y2="80" />
        <line x1="80" y1="20" x2="20" y2="80" />
      </svg>
    </div>
  )
}