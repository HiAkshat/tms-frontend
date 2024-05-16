import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination, Button } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';
import organisationServices from '../../services/organisation';
import { Placeholder, Modal } from 'rsuite';

import styles from "./RsuiteTable.module.scss"
import CustomButton from '../../atoms/CustomButton/CustomButton';

const { Column, HeaderCell, Cell } = Table;

export default function RsuiteTable() {
  const navigate = useNavigate()

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<[OrganisationType]>()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0)

  const [deleteOrg, setDeleteOrg] = useState('')

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(()=>{
    // setLoading(true)
    organisationServices.getOrganisations(page, limit).then(orgs => {
      setData(orgs.data)
      setTotalEntries(orgs.totalEntries)
      setLoading(false)
      console.log(data)
    })
  }, [page, limit])

  const [openModal, setOpenModal] = useState(false)

  const getData = () => {
    if (sortColumn && sortType && data) {
      return data.sort((a: { [x: string]: string|number; }, b: { [x: string]: string|number; }) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        if (typeof x === 'string') {
          x = x.toLowerCase().charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.toLowerCase().charCodeAt(0);
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn: SetStateAction<string>, sortType: SortType | undefined) => {
    // setLoading(true);
    setTimeout(() => {
      // setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
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
      navigate(0)
    } catch (error) {
      showToast("Error deleting organisation!")
    }
  };

  if (loading){
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
          data={getData()}
          onRowClick={rowData => {
            console.log(rowData);
          }}
        >
          <Column flexGrow={3} align="center" sortable>
            <HeaderCell>Organisation Name</HeaderCell>
            <Cell dataKey="organisation_name" />
          </Column>
          <Column flexGrow={3} align="center" sortable>
            <HeaderCell>Display Name</HeaderCell>
            <Cell dataKey="display_name" />
          </Column>
          <Column flexGrow={1}>
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
