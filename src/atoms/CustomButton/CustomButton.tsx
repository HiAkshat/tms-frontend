import { Button } from "rsuite"

export default function CustomButton({onClick, type, text, width="100%"}: any) {
  return (
    <Button style={{width: width}} onClick={onClick} type={type}>
      {text}
    </Button>
  )
}
