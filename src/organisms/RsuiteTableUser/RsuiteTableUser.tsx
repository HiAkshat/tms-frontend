import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination, Modal } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import { Placeholder } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"
import organisationUserServices from '../../services/organisationUser';
import useDeviceSize from '../../utils/useDeviceSize';
import helpers from '../../helpers';
import CustomButton from '../../atoms/CustomButton/CustomButton';

export default function RsuiteTable({isLoading, setIsLoading}: any) {
  const navigate = useNavigate()

  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>();
  const [data, setData] = useState<[UserType]>()
  // const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0)

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(()=>{
    organisationUserServices.getOrganisationUsers(page, limit).then((users)=>{
      setData(users.data)
      setTotalEntries(users.totalEntries)
      setIsLoading(false)
      console.log(data)
    })

  }, [page, limit, isLoading])

  const handleSortUpdate = async () => {
    await organisationUserServices.getOrganisationUsers(page, limit, `${sortType=="asc"?"":"-"}${sortColumn}`).then((users)=>{
      setData(users.data)
      setTotalEntries(users.totalEntries)
      setIsLoading(false)
      console.log(data)
    })
  }

  const getData = () => {
    if (data && sortColumn && sortType) {
      return data.sort((a:any,b:any): any => {
        a.sortColumn-b.sortColumn
        console.log(a[sortColumn], b[sortColumn])
    })
      // return data.sort((a: any, b: any) => {
      //   let x = a[sortColumn];
      //   let y = b[sortColumn];

      //   console.log(a)

      //   let m=0
      //   let n=0

      //   if (typeof x === 'string') {
      //     m = x.toLowerCase().charCodeAt(0);
      //   }
      //   if (typeof y === 'string') {
      //     n = y.toLowerCase().charCodeAt(0);
      //   }

      //   if (m && n){
      //     if (sortType === 'asc') {
      //       return m - n;
      //     } else {
      //       return n - m;
      //     }
      //   }

      //   return 0
      // });
    }
    return data;
  };

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

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await organisationUserServices.deleteOrganisationUser(id)
      navigate(0)
    } catch (error) {
      return
    }
  };

  const [windowWidth] = useDeviceSize()

  const [openModal, setOpenModal] = useState(false)
  const [deleteUser, setDeleteUser] = useState("")

  if (isLoading){
    return <Placeholder.Grid rows={10} columns={7} active />
  }


  else{
    return (
      <div>
        <Table
          className={styles.userTable}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          autoHeight
          data={getData()}
          onRowClick={rowData => {
            console.log(rowData);
          }}
        >
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1.5} align="center" sortable>
            <HeaderCell>Email ID</HeaderCell>
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
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center">
            <HeaderCell>Organisation</HeaderCell>
            <Cell dataKey="organisation.organisation_name" />
          </Column>
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center" sortable>
            <HeaderCell>Joining Date (DD/MM/YYY)</HeaderCell>
            <Cell dataKey="joining_date">{rowData => new Date(rowData.dob).toLocaleString('en-GB').split(",")[0]}</Cell>
          </Column>
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1}>
            <HeaderCell>Actions</HeaderCell>
            <ActionCell dataKey="_id" rowData={undefined} />
          </Column>
        </Table>
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
            <span>Delete user {data?.find(user => user._id==deleteUser)?.email_id}?</span>
            <div className={styles.buttons}>
              <CustomButton backgroundColor="#f54260" onClick={()=>{
                setOpenModal(false)
                handleDelete(deleteUser)
              }} text="Yes, delete!" />
              <CustomButton backgroundColor="rgba(0,0,0,0)" border="1px solid white" onClick={()=>{setOpenModal(false)}} text="Cancel" />
            </div>
          </div>
        </Modal>
      </div>
    )
  }

}
