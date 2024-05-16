import { SelectPicker } from "rsuite";

export default function SelectInput({arr, label, value, data, setData}: any) {
  return (
    <SelectPicker
      data={arr.map((item: any) => ({
        label: item[label],
        value: item[value],
      }))}
      onChange={setData}
      value={data}
    />
  )
}

