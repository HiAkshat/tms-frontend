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
  className=""
}: any) {
  return (
    <div className={`${styles.inputField} ${className}`}>
      <Stack spacing={10} direction="column" alignItems="flex-start">
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
          style={{ width: 224 }}
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
