import { Button } from "rsuite"
import styles from "./CustomButton.module.scss"

export default function CustomButton({onClick, type="submit", text, width="fit-content", backgroundColor="#2a2a2a", color="white", border="none"}: any) {
  return (
    <Button className={styles.customButton} classPrefix="btn" style={{width: width, backgroundColor: backgroundColor, color: color, border: border}} onClick={onClick} type={type}>
      {text}
    </Button>
  )
}
