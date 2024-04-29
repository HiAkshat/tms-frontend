import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from "./index.module.scss"
import { useNavigate } from 'react-router-dom';
import showToast from '../../atoms/toast';

const OrganisationTable = ({ data }: any) => {
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Organisation Name',
        accessor: 'organisation_name',
      },
      {
        Header: 'Display Name',
        accessor: 'display_name',
      },
      {
        Header: 'Actions',
        Cell: ({ row }: any) => (
          <div className={styles.actions}>
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
    navigate(`edit/${entry._id}`);
  };

  const handleDelete = async (entry: any) => {
    console.log('Delete entry:', entry);
    const res = await fetch(`http://127.0.0.1:8000/api/organisation/${entry._id}`, {
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

export default OrganisationTable;
