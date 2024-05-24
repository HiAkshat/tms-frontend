import styles from "./MultipleSelectInput.module.scss"

import { CheckPicker, SelectPicker, Stack } from "rsuite";

export default function MultipleSelectInput({
  arr=[],
  label="",
  value="",
  data,
  setData,
  options = undefined,
  placeholder="",
  className="",
  field="Select",
  width="100%"
}: any) {
  return (
    <div style={{width: width}} className={`${styles.inputField} ${className}`}>
      <span className={`${styles.inputHeading}`}>{field}</span>
      <Stack className={styles.inputField2} spacing={10} direction="column" alignItems="flex-start">
        <CheckPicker
          data={
            options
              ? options.map((option: any) => ({ label: option, value: option }))
              : arr.map((item: any) => ({
                  label: item[label],
                  value: item[value],
                }))
          }
          onChange={(e)=>{
            console.log(e)
            setData(e)
          }}
          searchable={true}
          placeholder={placeholder}
        />
      </Stack>
      {/* <SelectPicker
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
      /> */}
    </div>
  );
}
