import helpers from "../../helpers";
import styles from "./EmailInput.module.scss"
import {Input} from "rsuite"

import { useState } from "react";

export default function EmailInput({email, setEmail, placeholder="Enter your email", width="100%", field="Email"}: any) {
  const [isEmailValid, setIsEmailValid] = useState(true);

  return (
    <div style={{width: width}} className={styles.inputField}>
      <span className={`${styles.inputHeading} ${isEmailValid ? "" : styles.inputInvalid}`}>{field} {!isEmailValid && "(Invalid)"}</span>
      <Input placeholder={placeholder} value={email} onChange={(val: string)=>{
        setTimeout(() => {
          helpers.validateEmailAndSet(val, setIsEmailValid)
        }, 1000);
        setEmail(val)
      }} required={true}/>
    </div>
  )
}
