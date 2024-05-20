import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination, Modal, DateRangePicker } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import { Placeholder } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"
import organisationUserServices from '../../services/organisationUser';
import useDeviceSize from '../../utils/useDeviceSize';
import helpers from '../../helpers';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import organisationServices from '../../services/organisation';
import UserOrganisationsModal from '../userOrganisationsModal/userOrganisationsModal';
import EmailInput from '../../atoms/EmailInput/EmailInput';
import NameInput from '../../atoms/NameInput/NameInput';
import SelectInput from '../../atoms/SelectInput/SelectInput';

export default function RsuiteTable({isLoading, setIsLoading}: any) {
  const navigate = useNavigate()

  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>();
  const [data, setData] = useState<[UserType]>()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0)

  const [clickedUser, setClickedUser] = useState<UserType>()
  const [organisations, setOrganisations] = useState<OrganisationType[]>()

  const [updatingUserOrgs, setUpdatingUserOrgs] = useState(false)

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(()=>{
    organisationServices.getOrganisations().then((res)=>{
      setOrganisations(res.data)
    })

    organisationUserServices.getOrganisationUsers(page, limit, "", filters).then((users)=>{
      setData(users.data)
      setTotalEntries(users.totalEntries)
      setIsLoading(false)
    })

    if (clickedUser && data){
      setUpdatingUserOrgs(true)
    }

  }, [page, limit, isLoading])

  const handleSortUpdate = async () => {
    await organisationUserServices.getOrganisationUsers(page, limit, `${sortType=="asc"?"":"-"}${sortColumn}`, filters).then((users)=>{
      setData(users.data)
      setTotalEntries(users.totalEntries)
      setIsLoading(false)
      console.log(data)
    })
  }

  const handleSortColumn = (sortColumn: SetStateAction<string>, sortType: SortType | undefined) => {
    // setLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
      handleSortUpdate()
    }, 500);
  };

  const ActionCell = ({ rowData, dataKey, ...props }:any) => {
    // console.log(rowData[dataKey]);
    return (
      <Cell {...props} className="link-group">
        <span className={styles.actionButton} onClick={()=>handleEdit(rowData[dataKey])}>Edit</span>
        <span> - </span>
        <span className={styles.actionButton} onClick={()=>{
          setOpenModal(true)
          setDeleteUser(rowData[dataKey])
        }}>Delete</span>
      </Cell>
    );
  };

  const UserOrgsCell = ({ rowData, dataKey, ...props }:any) => {
    // console.log(rowData[dataKey]);
    return (
      <Cell {...props} className="link-group">
        <span className={styles.actionButton} onClick={()=>{
          setUserOrgs(rowData[dataKey])
          setOpenOrgsModal(true)
        }}>See Organisations</span>
      </Cell>
    );
  };

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true)
      await organisationUserServices.deleteOrganisationUser(id)
      setIsLoading(false)
    } catch (error) {
      return
    }
  };

  const [windowWidth] = useDeviceSize()

  const [openModal, setOpenModal] = useState(false)
  const [deleteUser, setDeleteUser] = useState("")

  const [openOrgsModal, setOpenOrgsModal] = useState(false)
  const [userOrgs, setUserOrgs] = useState<any>([])

  const [filters, setFilters] = useState({})
  const [filterEmail, setFilterEmail] = useState("")
  const [filterFirstName, setFilterFirstName] = useState("")
  const [filterLastName, setFilterLastName] = useState("")
  const [filterOrganisation, setFilterOrganisation] = useState("")
  const [filterStartDate, setFilterStartDate] = useState()
  const [filterEndDate, setFilterEndDate] = useState()

  const handleFilterSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const filters = {
      email_id: filterEmail,
      first_name: filterFirstName,
      last_name: filterLastName,
      organisation: filterOrganisation,
      start_dob: filterStartDate,
      end_dob: filterEndDate
    }

    setFilters(filters)

    await organisationUserServices.getOrganisationUsers(page, limit, "", filters).then((users)=>{
      setData(users.data)
      setTotalEntries(users.totalEntries)
      setIsLoading(false)
    })
  }

  return (
    <div>
      {
        isLoading ?
        <Placeholder.Grid rows={10} columns={7} active />
        :
        <div>
          <div className={styles.filtersBox}>
            <span>Filters</span>
            <form className={styles.filtersInputs}>
              <EmailInput email={filterEmail} setEmail={setFilterEmail} placeholder={"Email"} />
              <NameInput field="First Name" name={filterFirstName} setName={setFilterFirstName} placeholder="First Name" />
              <NameInput field="Last Name" name={filterLastName} setName={setFilterLastName} placeholder="Last Name" />
              {organisations && <SelectInput arr={organisations} value={"unique_id"} label={"organisation_name"} data={filterOrganisation} setData={setFilterOrganisation} placeholder="Organisation"/>}
              <div className={styles.inputField}>
                <DateRangePicker format="dd.MM.yyyy" placeholder="DOB Range" onChange={(e: any)=>{
                  setFilterStartDate(e[0])
                  setFilterEndDate(e[1])
                }}/>
              </div>
              <CustomButton onClick={handleFilterSubmit} type="submit" text="Apply filters" width="50%"/>
            </form>
          </div>
          <Table
            className={styles.userTable}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            autoHeight
            data={data}
            onRowClick={rowData => {
              setClickedUser(rowData)
              console.log(rowData);
            }}
          >
            <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1.5} align="center" sortable>
              <HeaderCell>
                <div className={styles.cellStyling}>
                  <span>Email ID</span>
                </div>
              </HeaderCell>
              <Cell dataKey="email_id" />
            </Column>
            <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center" sortable>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="first_name">{rowData => helpers.toTitleCase(rowData.first_name)}</Cell>
            </Column>
            <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center" sortable>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="last_name">{rowData => helpers.toTitleCase(rowData.last_name)}</Cell>
            </Column>
            <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center" sortable>
              <HeaderCell>DOB (DD/MM/YYY)</HeaderCell>
              <Cell dataKey="dob">{rowData => new Date(rowData.dob).toLocaleString('en-GB').split(",")[0]}</Cell>
            </Column>
            <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1}>
              <HeaderCell>Organisations</HeaderCell>
              <UserOrgsCell dataKey="organisations" rowData={undefined} />
            </Column>
            <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1}>
              <HeaderCell>Actions</HeaderCell>
              <ActionCell dataKey="unique_id" rowData={undefined} />
            </Column>
          </Table>
        </div>
      }
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          // first
          // last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={totalEntries}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      <Modal open={openModal} onClose={()=>{setOpenModal(false)}}>
        <div className={styles.deleteModal}>
          <span>Delete user {data?.find(user => user.unique_id==deleteUser)?.email_id}?</span>
          <div className={styles.buttons}>
            <CustomButton backgroundColor="#f54260" onClick={()=>{
              setOpenModal(false)
              handleDelete(deleteUser)
            }} text="Yes, delete!" />
            <CustomButton backgroundColor="rgba(0,0,0,0)" border="1px solid white" onClick={()=>{setOpenModal(false)}} text="Cancel" />
          </div>
        </div>
      </Modal>
      <UserOrganisationsModal updatingUserOrgs={updatingUserOrgs} setUpdatingUserOrgs={setUpdatingUserOrgs} openOrgsModal={openOrgsModal} setOpenOrgsModal={setOpenOrgsModal} userOrgs={userOrgs} clickedUser={clickedUser} organisations={organisations}/>
    </div>
  )

}
