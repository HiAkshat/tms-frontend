import styles from "./SelectInput.module.scss"

import { SelectPicker } from "rsuite";

export default function SelectInput({
  arr=[],
  label="",
  value="",
  data,
  setData,
  options = undefined,
  placeholder="",
  className="",
  field="Select"
}: any) {
  return (
    <div className={`${styles.inputField} ${className}`}>
      <span className={`${styles.inputHeading}`}>{field}</span>
      <SelectPicker
        data={
          options
            ? options.map((option: any) => ({ label: option, value: option }))
            : arr.map((item: any) => ({
                label: item[label],
                value: item[value],
              }))
        }
        onChange={setData}
        value={data}
        placeholder={placeholder}
      />
    </div>
  );
}
