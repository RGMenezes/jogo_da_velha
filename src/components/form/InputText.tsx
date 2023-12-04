import styles from './InputText.module.css'

interface InputText{
  text: string;
  type: string
  name: string;
  id: string;
  autoComplete?: string;
  require?: boolean;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
}

export default function InputText({
  text, 
  type,
  name,
  id,
  autoComplete,
  require,
  placeholder,
  defaultValue,
  maxLength,
  minLength,
}: InputText){
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>{text}</label>
      {require ? (
        <input 
          className={styles.input}
          type={type} name={name} id={id} 
          autoComplete={autoComplete} 
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          minLength={minLength}
          required
        />
      ): (
        <input 
          className={styles.input}
          type={type} name={name} id={id} 
          autoComplete={autoComplete} 
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          minLength={minLength}
        />
      )}
    </div>
  )
}