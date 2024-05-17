import { Modal } from "rsuite"

import styles from "./userOrganisationModal.module.scss"
import organisationUserServices from "../../services/organisationUser"
import SelectInput from "../../atoms/SelectInput/SelectInput"
import { useEffect, useState } from "react"
import organisationServices from "../../services/organisation"
import DateInput from "../../atoms/DateInput/DateInput"
import CustomButton from "../../atoms/CustomButton/CustomButton"
import showToast from "../../atoms/Toast/Toast"

export default function UserOrganisationsModal({setUpdatingUserOrgs, openOrgsModal, setOpenOrgsModal, userOrgs, clickedUser}: any) {
  const [organisation, setOrganisation] = useState("")
  const [organisations, setOrganisations] = useState<OrganisationType[]>()
  const [joiningDate, setJoiningDate] = useState<Date>()


  useEffect(()=>{
    organisationServices.getOrganisations().then((res)=>{
      setOrganisations(res.data)
    })
  }, [])

  const handleSubmit = async () => {
    if (!joiningDate){
      showToast("Invalid data!")
      return
    }

    await organisationUserServices.addOrganisationToUser(clickedUser.unique_id, organisation, joiningDate)
  }


  return (
    <Modal open={openOrgsModal} onClose={()=>{
      setOpenOrgsModal(false)
      }}>
      <Modal.Title>Organisations</Modal.Title>
      <div>
        <SelectInput arr={organisations} value={"unique_id"} label={"organisation_name"} data={organisation} setData={setOrganisation}/>
        <DateInput date={joiningDate} setDate={setJoiningDate} placeholder={"Joining Date"} />
        <CustomButton onClick={handleSubmit} type="submit" text="Add" width="100%"/>
      </div>

      <div className={styles.orgs}>
        {userOrgs.map((myOrg: any) => {
          return (
            <div className={styles.orgDetails} key={myOrg.organisation_id}>
              <span className={styles.orgName}>{organisations && organisations.find((org: any) => org.unique_id == myOrg.organisation_id)?.organisation_name}</span>
              <span className={styles.joiningDate}>Joined on {new Date(myOrg.joining_date).toLocaleString('en-GB').split(",")[0]}</span>
              <button className={styles.deleteButton} onClick={async ()=>{
                if (clickedUser){
                  setUpdatingUserOrgs(true)
                  await organisationUserServices.removeOrganisationFromUser(clickedUser.unique_id, myOrg.organisation_id)
                }
              }}>Delete</button>
            </div>
        )})}
      </div>
    </Modal>
  )
}
