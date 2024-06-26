import helpers from "../../helpers";
import styles from "./NameInput.module.scss"
import {Input} from "rsuite"

import { useState } from "react";

export default function NameInput({name, field, setName, placeholder="Enter your name", width="100%"}: any) {
  const [isNameValid, setIsNameValid] = useState(true);

  return (
  <div style={{width: width}} className={styles.inputField}>
    <Input placeholder={placeholder} value={name} onChange={(val: string)=>{
      setTimeout(() => {
        helpers.validateNameAndSet(val, setIsNameValid)
      }, 1000);
      setName(val)
    }} required={true}/>
    <span hidden={isNameValid}>Invalid {field}</span>
  </div>
  )
}
