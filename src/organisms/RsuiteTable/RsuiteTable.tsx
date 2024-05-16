import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';
import organisationServices from '../../services/organisation';
import { Placeholder, Modal } from 'rsuite';

import styles from "./RsuiteTable.module.scss"
import CustomButton from '../../atoms/CustomButton/CustomButton';
import useDeviceSize from '../../utils/useDeviceSize';

const { Column, HeaderCell, Cell } = Table;

export default function RsuiteTable({isLoading, setIsLoading}: any) {
  const navigate = useNavigate()

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>();
  const [data, setData] = useState<[OrganisationType]>()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0)

  const [deleteOrg, setDeleteOrg] = useState('')

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

  const fetchOrganisationData = async () => {
    await organisationServices.getOrganisations(page.toString(), limit.toString()).then(orgs => {
      setData(orgs.data)
      setTotalEntries(orgs.totalEntries)
      setIsLoading(false)
      console.log(data)
    })
  }

  useEffect(()=>{
    fetchOrganisationData()
  }, [page, limit, isLoading])

  const [openModal, setOpenModal] = useState(false)


  const handleSortUpdate = async () => {
    await organisationServices.getOrganisations(page.toString(), limit.toString(), `${sortType=="asc"?"":"-"}${sortColumn}`).then(orgs => {
      setData(orgs.data)
      setTotalEntries(orgs.totalEntries)
      setIsLoading(false)
      console.log(data)
    })
  }

  const handleSortColumn = async (sortColumn: SetStateAction<string>, sortType: SortType | undefined) => {
    setTimeout(() => {
      setSortColumn(sortColumn);
      setSortType(sortType);
      handleSortUpdate()
    }, 100);
  };

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
    // console.log(rowData[dataKey]);
    return (
      <Cell {...props} className="link-group">
        <span className={styles.actionButton} onClick={()=>handleEdit(rowData[dataKey])}>Edit</span>
        <span> - </span>
        <span className={styles.actionButton} onClick={()=>{
          setDeleteOrg(rowData[dataKey])
          setOpenModal(true)
          // handleDelete(rowData[dataKey])}
        }}>Delete</span>
      </Cell>
    );
  };

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await organisationServices.deleteOrganisation(id)
      showToast("Organisation deleted successfully!")
      fetchOrganisationData()
    } catch (error) {
      showToast("Error deleting organisation!")
    }
  };

  const [windowWidth] = useDeviceSize()

  if (isLoading){
    return <Placeholder.Grid rows={8} columns={3} active />
  }

  else{
    return (
      <div>
        <Table
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          // height={400}
          autoHeight
          data={data}
          onRowClick={rowData => {
            console.log(rowData);
          }}
        >
          <Column  minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={3} align="center" sortable>
            <HeaderCell>Organisation Name</HeaderCell>
            <Cell dataKey="organisation_name" />
          </Column>
          <Column  minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={3} align="center" sortable>
            <HeaderCell>Display Name</HeaderCell>
            <Cell dataKey="display_name" />
          </Column>
          <Column  minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1}>
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
            <span>Delete organisation {data?.find(org => org._id==deleteOrg)?.organisation_name}?</span>
            <div className={styles.buttons}>
              <CustomButton backgroundColor="#f54260" onClick={()=>{
                setOpenModal(false)
                handleDelete(deleteOrg)
              }} text="Yes, delete!" />
              <CustomButton backgroundColor="rgba(0,0,0,0)" border="1px solid white" onClick={()=>{setOpenModal(false)}} text="Cancel" />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}


