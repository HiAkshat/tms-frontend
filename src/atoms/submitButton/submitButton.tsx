import styles from "./index.module.scss"

export default function SubmitButton ({type, onClick, title}: any) {
  return (
    <button className={styles.submitButton} type={type} onClick={onClick}>
      {title}
    </button>
  )
}
