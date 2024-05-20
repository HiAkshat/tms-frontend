import { Table, Modal } from "rsuite"

import styles from "./userOrganisationModal.module.scss"
import organisationUserServices from "../../services/organisationUser"
import SelectInput from "../../atoms/SelectInput/SelectInput"
import { useEffect, useState } from "react"
import organisationServices from "../../services/organisation"
import DateInput from "../../atoms/DateInput/DateInput"
import CustomButton from "../../atoms/CustomButton/CustomButton"
import showToast from "../../atoms/Toast/Toast"
import useDeviceSize from "../../utils/useDeviceSize"

export default function UserOrganisationsModal({setUpdatingUserOrgs, openOrgsModal, setOpenOrgsModal, userOrgs, clickedUser}: any) {
  const { Column, HeaderCell, Cell } = Table;

  const [organisation, setOrganisation] = useState("")
  const [organisations, setOrganisations] = useState<OrganisationType[]>()
  const [joiningDate, setJoiningDate] = useState<Date>()

  const [windowWidth] = useDeviceSize()

  const ActionCell = ({ rowData, dataKey, ...props }:any) => {
    return (
      <Cell {...props} className="link-group">
        <button className={styles.deleteButton} onClick={async ()=>{
          if (clickedUser){
            setUpdatingUserOrgs(true)
            console.log(rowData)
            await organisationUserServices.removeOrganisationFromUser(clickedUser.unique_id, rowData[dataKey])
            setUpdatingUserOrgs(false)
          }
        }}>Delete</button>
      </Cell>
    );
  };

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
      <div className={styles.section}>
        <h3>Organisations</h3>
        <span className={styles.sectionHeading}>Add new organisation to user</span>
        <div className={styles.newOrgForm}>
          <SelectInput arr={organisations} value={"unique_id"} label={"organisation_name"} data={organisation} setData={setOrganisation}/>
          <DateInput date={joiningDate} setDate={setJoiningDate} placeholder={"Joining Date"} />
          <CustomButton onClick={handleSubmit} type="submit" text="Add" width="fit-content" backgroundColor="#1a1d24"/>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionHeading}>User's Organisations</span>
        <Table
          className={styles.userTable}
          autoHeight
          data={userOrgs}
        >
          <Column flexGrow={1} align="center">
            <HeaderCell>Organisation Name</HeaderCell>
            <Cell dataKey="unique_id">{rowData => organisations && organisations.find((org: any) => org.unique_id == rowData.organisation_id)?.organisation_name}</Cell>
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Joining Date</HeaderCell>
            <Cell dataKey="joining_date">{rowData => new Date(rowData.joining_date).toLocaleString('en-GB').split(",")[0]}</Cell>
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Actions</HeaderCell>
            <ActionCell dataKey="organisation_id" rowData={undefined}/>
          </Column>
        </Table>
      </div>
    </Modal>
  )
}
