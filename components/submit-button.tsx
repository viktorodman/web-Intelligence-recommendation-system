import styles from '../styles/Button.module.css'
type SubmitButtonProps = {
    text: string
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <div>
        <button className={styles.button}>{text}</button>
    </div>
  )
}

export default SubmitButton
