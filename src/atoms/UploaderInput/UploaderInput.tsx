import styles from "./UploaderInput.module.scss"

import { Uploader } from "rsuite"
import showToast from "../Toast/Toast"

export default function UploaderInput({upload_link, files, setFiles, field=""}: any) {
  return (
    <div className={styles.inputField}>
      <span className={`${styles.inputHeading}`}>{field}</span>
      <Uploader action={upload_link} draggable onChange={(e)=>{
        console.log(e)
        }}

        onError={(e)=>{
          showToast(e.response.message)
        }}

        onSuccess={(res)=>{
          const newFiles = files ?? [""]
          newFiles.push(res.filename)
          setFiles(newFiles)
        }}
      >
        <div style={{ width: 400, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Click or Drag files to this area to upload</span>
        </div>
      </Uploader>
    </div>
  )
}
