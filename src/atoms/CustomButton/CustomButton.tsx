import { Button } from "rsuite"

export default function CustomButton({onClick, type, text, width="fit-content", backgroundColor="#2a2a2a", color="white", border="none"}: any) {
  return (
    <Button style={{width: width, backgroundColor: backgroundColor, color: color, border: border}} onClick={onClick} type={type}>
      {text}
    </Button>
  )
}
