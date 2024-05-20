import styles from "./TextInput.module.scss"

import {Input} from "rsuite"
import { useState } from "react";
import helpers from "../../helpers";

export default function TextInput({text, field, setText, placeholder="Enter text", width="100%"}: any) {
  const [isTextValid, setIsTextValid] = useState(true);

  return (
  <div style={{width: width}} className={styles.inputField}>
    <span className={`${styles.inputHeading} ${isTextValid ? "" : styles.inputInvalid}`}>{field} {!isTextValid && "(Invalid)"}</span>
    <Input placeholder={placeholder} value={text} onChange={(val: string)=>{
      setTimeout(() => {
        helpers.isTextEmptyAndSet(val, setIsTextValid)
      }, 1000);
      setText(val)
    }} required={true}/>
  </div>
  )
}
