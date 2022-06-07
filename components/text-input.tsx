import styles from '../styles/TextInput.module.css'

type TextInputProps = {
    text: string
}

const TextInput = ({ text }: TextInputProps) => {
  return (
    <div className={styles.textInputWrapper}>
        <label htmlFor={text.toLowerCase()} className={styles.label}>{text}</label>
        <input type="text" name={text.toLowerCase()} id={text.toLowerCase()} className={styles.input}/>
    </div>
  )
}

export default TextInput
