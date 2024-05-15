import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import { Placeholder } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"
import organisationUserServices from '../../services/organisationUser';
import useDeviceSize from '../../utils/useDeviceSize';

export default function RsuiteTable() {
  const navigate = useNavigate()

  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>();
  const [data, setData] = useState<[UserType]>()
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(false)
      console.log(data)
    })

  }, [page, limit])

  const getData = () => {
    if (data && sortColumn && sortType) {
      return data.sort((a: any, b: any) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        let m=0
        let n=0

        if (typeof x === 'string') {
          m = x.toLowerCase().charCodeAt(0);
        }
        if (typeof y === 'string') {
          n = y.toLowerCase().charCodeAt(0);
        }

        if (m && n){
          if (sortType === 'asc') {
            return m - n;
          } else {
            return n - m;
          }
        }

        return 0
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn: SetStateAction<string>, sortType: SortType | undefined) => {
    // setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const ActionCell = ({ rowData, dataKey, ...props }:any) => {
    // console.log(rowData[dataKey]);
    return (
      <Cell {...props} className="link-group">
        <span className={styles.actionButton} onClick={()=>handleEdit(rowData[dataKey])}>Edit</span>
        <span> - </span>
        <span className={styles.actionButton} onClick={()=>handleDelete(rowData[dataKey])}>Delete</span>
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

  if (loading){
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
            <Cell dataKey="first_name" />
          </Column>
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center" sortable>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="last_name" />
          </Column>
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center" sortable>
            <HeaderCell>DOB</HeaderCell>
            <Cell dataKey="dob">{rowData => new Date(rowData.dob).toLocaleString().split(",")[0]}</Cell>
          </Column>
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center">
            <HeaderCell>Organisation</HeaderCell>
            <Cell dataKey="organisation.organisation_name" />
          </Column>
          <Column minWidth={windowWidth<1000 ? 250 : undefined} flexGrow={1} align="center" sortable>
            <HeaderCell>Joining Date</HeaderCell>
            <Cell dataKey="joining_date">{rowData => new Date(rowData.dob).toLocaleString().split(",")[0]}</Cell>
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
      </div>
    )
  }

}
