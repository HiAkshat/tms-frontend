import styles from "./DateInput.module.scss"

import { DatePicker } from "rsuite";

export default function DateInput({date, setDate, placeholder="Enter date", width="100%"}: any) {
  return (
    <div className={styles.inputField}>
      <DatePicker
        name="joining_date"
        value={date}
        onChange={setDate}
        placeholder={placeholder}
      />
    </div>
  )
}
