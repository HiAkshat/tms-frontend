import { DateRangePicker } from "rsuite";
import styles from "./DateRangeInput.module.scss";
import { Dispatch } from "react";

type DateRangeInputProps = {
  setFilterStartDate: Dispatch<undefined>,
  setFilterEndDate: Dispatch<undefined>,
  field: string,
  placeholder: string
};

export default function DateRangeInput({
  setFilterStartDate,
  setFilterEndDate,
  field = "",
  placeholder="Date Range"
}: DateRangeInputProps) {
  return (
    <div className={styles.inputField}>
      <span className={`${styles.inputHeading}`}>{field}</span>
      <DateRangePicker
        format="dd.MM.yyyy"
        placeholder={placeholder}
        onOk={(e: any) => {
          setFilterStartDate(e[0]);
          setFilterEndDate(e[1]);
        }}
        onClean={() => {
          setFilterStartDate(undefined)
          setFilterEndDate(undefined)
        }}
        placement="autoVerticalStart"
      />
    </div>
  );
}
