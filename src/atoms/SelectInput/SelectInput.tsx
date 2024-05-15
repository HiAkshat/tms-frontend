import { SelectPicker } from "rsuite";

export default function SelectInput({data, label, value, setValue}: any) {
  return (
    <SelectPicker
      data={data.map((item: any) => ({
        label: item[label],
        value: item[value],
      }))}
      onChange={setValue}
    />
  )
}

