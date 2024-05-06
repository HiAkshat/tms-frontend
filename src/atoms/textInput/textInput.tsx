// @ts-nocheck

import styles from "./TextInput.module.scss"

interface Props {
  placeholder: string,
  name: string,
  value: string,
  onChange: React.ChangeEventHandler,
  required: boolean,
}

export default function TextInput({placeholder, name, value, onChange, required, fullWidth} : Props) {
  return (
    <input className={styles.textInput} placeholder={placeholder} type="text" name={name} value={value} onChange={onChange} required={required} />
  )
}
