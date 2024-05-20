import { DateRangePicker } from "rsuite"
import styles from "./DateRangeInput.module.scss"
import { Dispatch } from "react"

type DateRangeInputProps = {
  setFilterStartDate: Dispatch<undefined>,
  setFilterEndDate: Dispatch<undefined>,
  field: string
}

export default function DateRangeInput({setFilterStartDate, setFilterEndDate, field=""}: DateRangeInputProps) {
  return (
    <div className={styles.inputField}>
      <span className={`${styles.inputHeading}`}>{field}</span>
      <DateRangePicker format="dd.MM.yyyy" placeholder="DOB Range" onChange={(e: any)=>{
        setFilterStartDate(e[0])
        setFilterEndDate(e[1])
      }}/>
    </div>
  )
}
