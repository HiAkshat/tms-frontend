import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import { Placeholder } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"
import organisationUserServices from '../../services/organisationUser';

export default function RsuiteTable() {
  const navigate = useNavigate()

  const [data, setData] = useState<any>()

  const [sortColumn, setSortColumn] = useState<any>();
  const [sortType, setSortType] = useState<any>();

  const [loading, setLoading] = useState<any>(true);

  useEffect(()=>{
    organisationUserServices.getOrganisationUsers().then((users)=>{
      setData(users)
      setLoading(false)
    })
  }, [])

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
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
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
    // {console.log(rowData)}
    // console.log(rowData[dataKey]);
    return (
      <Cell {...props} className="link-group">
        <span onClick={()=>handleEdit(rowData[dataKey])}>Edit</span>
        <span> - </span>
        <span onClick={()=>handleDelete(rowData[dataKey])}>Delete</span>
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

  if (loading){
    return <Placeholder.Grid rows={10} columns={7} active />
  }

  else{
    return (
      <Table
        className={styles.userTable}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        height={400}
        data={getData()}
        onRowClick={rowData => {
          console.log(rowData);
        }}
      >
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>Email ID</HeaderCell>
          <Cell dataKey="email_id" />
        </Column>
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="first_name" />
        </Column>
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="last_name" />
        </Column>
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>DOB</HeaderCell>
          <Cell dataKey="dob">{rowData => new Date(rowData.dob).toLocaleString().split(",")[0]}</Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>Organisation</HeaderCell>
          <Cell dataKey="organisation.organisation_name" />
        </Column>
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>Joining Date</HeaderCell>
          <Cell dataKey="joining_date">{rowData => new Date(rowData.dob).toLocaleString().split(",")[0]}</Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Actions</HeaderCell>
          <ActionCell dataKey="_id" rowData={undefined} />
        </Column>
      </Table>
    )
  }

}
