import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker, Pagination, Placeholder, Table } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';

import { useSelector } from "react-redux"
import Cookie from "js-cookie"

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTable.module.scss"
import ticketServices from '../../services/ticket';
import { StateType } from '../../typings/navUser';
import verifyTokenServices from '../../services/verifyToken';
import CustomButton from '../../atoms/CustomButton/CustomButton';

export default function RsuiteTable({isLoading, setIsLoading}: {isLoading: boolean, setIsLoading: Dispatch<boolean>}) {
  const navigate = useNavigate()
  const user = useSelector((state: StateType) => state.user)

  const [data, setData] = useState<[TicketType]>()
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0)

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(()=>{
    // verifyTokenServices.verifyToken
    console.log("INSIDE TICKET TABLE")

    verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then(()=>{
      let sortByString = ""
      if (sortColumn){
        sortByString = `${sortType=="asc" ? "" : "-"}${sortColumn}`
      }

      ticketServices.getOrgTickets(Cookie.get("organisation"), page, limit, sortByString).then((tickets)=>{
        setData(tickets.data)
        setTotalEntries(tickets.totalEntries)
        setIsLoading(false)
      })
    })
  }, [user, page, limit, sortColumn, sortType, isLoading])

  const getData = () => {
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
    <div>
      {
        isLoading ?
        <Placeholder.Grid rows={10} columns={7} active />
        :
        <div>
          {/* <div className={styles.filtersBox}>
            <span>Filters</span>
            <form className={styles.filtersInputs}>
              <NameInput field="Last Name" name={filterLastName} setName={setFilterLastName} placeholder="Last Name" />
              {<SelectInput arr={organisations} value={"unique_id"} label={"organisation_name"} data={filterOrganisation} setData={setFilterOrganisation} placeholder="Organisation"/>}
              <div className={styles.inputField}>
                <DateRangePicker format="dd.MM.yyyy" placeholder="DOB Range" onChange={(e: any)=>{
                  setFilterStartDate(e[0])
                  setFilterEndDate(e[1])
                }}/>
              </div>
              <CustomButton onClick={handleFilterSubmit} type="submit" text="Apply filters" width="50%"/>
            </form>
          </div> */}
          <Table
            className={styles.userTable}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            autoHeight
            data={data}
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
      }
    </div>
  )
}
