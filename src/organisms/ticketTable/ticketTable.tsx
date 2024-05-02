import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from "./index.module.scss"
import { useNavigate } from 'react-router-dom';
import showToast from '../../atoms/toast';

const TicketTable = ({ data }: any) => {
  const navigate = useNavigate()

  const columns = React.useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Key',
        accessor: 'key',
      },
      {
        Header: 'Assignee',
        accessor: 'assignee.first_name',
      },
      {
        Header: 'Reporter',
        accessor: 'reporter.first_name',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Due Date',
        accessor: 'due_date',
        Cell: ({ value }: any) => {
          const formattedDate = new Date(value).toLocaleDateString();
          return formattedDate;
        },
      },
      {
        Header: 'Actions',
        Cell: ({ row }: any) => (
          <div className={styles.actions}>
            <button onClick={() => handleView(row.original)}>View details</button>
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const handleEdit = (entry: any) => {
    console.log('Edit entry:', entry);
    navigate(`../ticket/edit/${entry._id}`);
  };

  const handleView = async (entry: any) => {
    navigate(`../ticket/${entry._id}`)
  }


  const handleDelete = async (entry: any) => {
    console.log('Delete entry:', entry);
    const res = await fetch(`http://127.0.0.1:8000/api/ticket/${entry._id}`, {
      method: "DELETE",
    })


    if (!res.ok){
      showToast("Error deleting ticket!")
      return
    }

    showToast("Ticket deleted successfully!")
  };

  return (
    <table className={styles.mainTable} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TicketTable;
