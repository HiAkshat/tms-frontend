import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"

export default function RsuiteTable({data}: any) {
  console.log(data)
  const navigate = useNavigate()

  const [sortColumn, setSortColumn] = useState<any>();
  const [sortType, setSortType] = useState<any>();
  // const [loading, setLoading] = useState<any>(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort(( a: any, b: any )=> {
        console.log(a, b)
        if ( a.last_nom < b.last_nom ){
          return -1;
        }
        if ( a.last_nom > b.last_nom ){
          return 1;
        }
        return 0;
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

    // {console.log(rowData)}
    // console.log(rowData[dataKey]);
    return (
      <Cell {...props} className="link-group">
        <span onClick={()=>navigate(`../ticket/${rowData[dataKey]}`)}>View</span>
        <span> - </span>
        <span onClick={()=>handleEdit(rowData[dataKey])}>Edit</span>
        <span> - </span>
        <span onClick={()=>handleDelete(rowData[dataKey])}>Delete</span>
      </Cell>
    );
  };

  const handleEdit = (id: string) => {
    navigate(`../ticket/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete entry:', id);
    const res = await fetch(`http://127.0.0.1:8000/api/organisationUser/${id}`, {
      method: "DELETE",
    })


    if (!res.ok){
      showToast("Error deleting organisation user!")
      return
    }

    showToast("Organisation user deleted successfully!")
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
        <HeaderCell>Type</HeaderCell>
        <Cell dataKey="type" />
      </Column>
      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>Key</HeaderCell>
        <Cell dataKey="key" />
      </Column>
      <Column flexGrow={1} align="center">
        <HeaderCell>Assignee</HeaderCell>
        <Cell dataKey="assignee.first_name" />
      </Column>
      <Column flexGrow={1} align="center">
        <HeaderCell>Reporter</HeaderCell>
        <Cell dataKey="reporter.first_name" />
      </Column>
      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="status" />
      </Column>
      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>Due Date</HeaderCell>
        <Cell dataKey="due_date">{rowData => new Date(rowData.due_date).toLocaleString().split(",")[0]}</Cell>
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>Actions</HeaderCell>
        <ActionCell dataKey="_id" rowData={undefined} />
      </Column>
    </Table>
  )
}
