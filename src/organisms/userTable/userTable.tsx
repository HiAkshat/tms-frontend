import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from "./index.module.scss"

const UserTable = ({ data }: any) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Email ID',
        accessor: 'email_id',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'DOB',
        accessor: 'dob',
        Cell: ({ value }: any) => {
          // Format date to display only the date part
          const formattedDate = new Date(value).toLocaleDateString();
          return formattedDate;
        },
      },
      {
        Header: 'Organisation',
        accessor: 'organisation.organisation_name',
        // Cell: ({ value }) => {
        //   console.log(org)
        //   const organisation = organisations.find(org => org._id === value);
        //   return organisation ? organisation.organisation_name : ""
        // },
      },
      {
        Header: 'Joining Date',
        accessor: 'joining_date',
        Cell: ({ value }) => {
          // Format date to display only the date part
          const formattedDate = new Date(value).toLocaleDateString();
          return formattedDate
        },
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
    console.log('Edit entry:', entry);
  };

  const handleDelete = (entry: any) => {
    console.log('Delete entry:', entry);
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

export default UserTable;
