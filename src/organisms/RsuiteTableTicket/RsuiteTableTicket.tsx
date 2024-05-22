import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker, Pagination, Placeholder, Table } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';

import { useSelector } from "react-redux"
import Cookie from "js-cookie"

const { Column, HeaderCell, Cell } = Table;

import styles from "./RsuiteTableTicket.module.scss"
import ticketServices from '../../services/ticket';
import { StateType } from '../../typings/navUser';
import verifyTokenServices from '../../services/verifyToken';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import SelectInput from '../../atoms/SelectInput/SelectInput';
import organisationUserServices from '../../services/organisationUser';
import DateRangeInput from '../../atoms/DateRangeInput/DateRangeInput';

export default function RsuiteTable({isLoading, setIsLoading}: {isLoading: boolean, setIsLoading: Dispatch<boolean>}) {
  const navigate = useNavigate()
  const user = useSelector((state: StateType) => state.user)

  const [data, setData] = useState<[TicketType]>()
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0)

  const [filters, setFilters] = useState({})

  const [users, setUsers] = useState<[UserType]>()
  const filterTypeOptions = ["Story", "Task", "Bug"]
  const filterStatusOptions = ['To be picked', 'In progress', 'In testing', 'Completed']

  const [filterTicketType, setFilterTicketType] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterAssigneeId, setFilterAssigneeId] = useState()
  const [filterReporterId, setFilterReporterId] = useState()
  const [filterStartDate, setFilterStartDate] = useState()
  const [filterEndDate, setFilterEndDate] = useState()


  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(()=>{
    organisationUserServices.getOrganisationUsersByOrgId(Cookie.get("organisation")??"").then(res => {
      setUsers(res)
    })

    verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then((res)=>{

      const filters = {
        reporter_id: res.decoded.user.unique_id
      }

      setFilterReporterId(res.decoded.user.unique_id)
      setFilters(filters)

      ticketServices.getOrgTickets(Cookie.get("organisation"), page, limit, "", filters).then((tickets)=>{
        setData(tickets.data)
        setTotalEntries(tickets.totalEntries)
        setIsLoading(false)
      })
    })
  }, [])

  useEffect(()=>{
    let sortByString = ""
    if (sortColumn){
      sortByString = `${sortType=="asc" ? "" : "-"}${sortColumn}`
    }

    ticketServices.getOrgTickets(Cookie.get("organisation"), page, limit, sortByString, filters).then((tickets)=>{
      setData(tickets.data)
      setTotalEntries(tickets.totalEntries)
      setIsLoading(false)
    })
  }, [user, page, limit, sortColumn, sortType, isLoading])


  const handleSortColumn = (sortColumn: SetStateAction<string>, sortType: SortType | undefined) => {
    setTimeout(() => {
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 100);
  };

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
    return (
      <Cell {...props} className="link-group">
        <span className={styles.actionButton} onClick={()=>navigate(`../ticket/${rowData[dataKey]}`)}>View</span>
        <span> - </span>
        <span className={styles.actionButton} onClick={()=>handleEdit(rowData[dataKey])}>Edit</span>
        <span> - </span>
        <span className={styles.actionButton} onClick={()=>handleDelete(rowData[dataKey])}>Delete</span>
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

  const handleFilterSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const filters = {
      type: filterTicketType,
      status: filterStatus,
      start_due_date: filterStartDate,
      end_due_date: filterEndDate,
      assignee_id: filterAssigneeId,
      reporter_id: filterReporterId
    }

    setFilters(filters)

    let sortByString = ""
    if (sortColumn){
      sortByString = `${sortType=="asc" ? "" : "-"}${sortColumn}`
    }

    await ticketServices.getOrgTickets(Cookie.get("organisation"), page, limit, sortByString, filters).then((tickets)=>{
      setData(tickets.data)
      setTotalEntries(tickets.totalEntries)
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
              <SelectInput options={filterTypeOptions} data={filterTicketType} setData={setFilterTicketType} placeholder={"Type"}/>
              <SelectInput options={filterStatusOptions} data={filterStatus} setData={setFilterStatus} placeholder={"Status"}/>
              {users && <SelectInput arr={users} value={"unique_id"} label={"first_name"} data={filterAssigneeId} setData={setFilterAssigneeId} placeholder={"Assignee"}/>}
              {users && <SelectInput arr={users} value={"unique_id"} label={"first_name"} data={filterReporterId} setData={setFilterReporterId} placeholder={"Reporter"}/>}
              <DateRangeInput setFilterStartDate={setFilterStartDate} setFilterEndDate={setFilterEndDate} field="Due date range" />
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
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>Assignee</HeaderCell>
              <Cell dataKey="assignee_name" />
            </Column>
            <Column flexGrow={1} align="center" sortable>
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
