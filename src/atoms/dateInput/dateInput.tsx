import styles from "./index.module.scss"

interface Props {
  placeholder: string,
  name: string,
  value: string,
  onChange: React.ChangeEventHandler,
  required: boolean
}

export default function DateInput({name, value, onChange, placeholder, required}: Props) {
  return (
    <input className={styles.date} name={name} value={value} onChange={onChange} placeholder={placeholder} type="date" required={required}/>
  )
}