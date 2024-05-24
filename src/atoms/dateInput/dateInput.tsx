import helpers from "../../helpers";
import styles from "./DateInput.module.scss"

import { DatePicker } from "rsuite";

export default function DateInput({date, setDate, placeholder="Enter date", width="100%", field="Date", shouldDisableDate}: any) {
  return (
    <div className={styles.inputField}>
      <span className={`${styles.inputHeading}`}>{field}</span>
      <DatePicker
        // name="joining_date"
        value={date}
        onChange={(e)=>{
          setDate(e)
        }}
        placeholder={placeholder}
        shouldDisableDate={shouldDisableDate ? shouldDisableDate : ()=>{return false}}
      />
    </div>
  )
}
