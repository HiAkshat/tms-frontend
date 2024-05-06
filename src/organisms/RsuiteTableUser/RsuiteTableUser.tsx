import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Pagination, IconButton, Whisper } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"

export default function RsuiteTable({data}: any) {
  const navigate = useNavigate()

  const [sortColumn, setSortColumn] = useState<any>();
  const [sortType, setSortType] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 100);
  };

  const ActionCell = ({ rowData, dataKey, ...props }) => {

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
    console.log('Delete entry:', id);
    const res = await fetch(`http://127.0.0.1:8000/api/organisation/${id}`, {
      method: "DELETE",
    })


    if (!res.ok){
      showToast("Error deleting organisation!")
      return
    }

    showToast("Organisation deleted successfully!")
    navigate("")
  };

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
