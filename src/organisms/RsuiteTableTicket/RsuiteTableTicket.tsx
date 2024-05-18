import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';

import { useSelector } from "react-redux"
import Cookie from "js-cookie"

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"
import ticketServices from '../../services/ticket';
import { StateType } from '../../typings/navUser';
import verifyTokenServices from '../../services/verifyToken';

export default function RsuiteTable() {
  const navigate = useNavigate()
  const user = useSelector((state: StateType) => state.user)

  const [data, setData] = useState<[TicketType]>()
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>();

  useEffect(()=>{
    // verifyTokenServices.verifyToken
    console.log("INSIDE TICKET TABLE")

    verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then(()=>{
      ticketServices.getOrgTickets(Cookie.get("organisation")).then((data)=>{
        setData(data)
      })
    })
  }, [user])

  const getData = () => {
    if (sortColumn && sortType && data) {
      return data.sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
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
      console.log(sortColumn)
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
    try {
      await ticketServices.deleteTicket(id)
      navigate(0)
    } catch (error) {
      return
    }
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
        <Cell dataKey="assignee_name" />
      </Column>
      <Column flexGrow={1} align="center">
        <HeaderCell>Reporter</HeaderCell>
      <Cell dataKey="reporter_name" />
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
        <ActionCell dataKey="unique_id" rowData={undefined} />
      </Column>
    </Table>
  )
}
