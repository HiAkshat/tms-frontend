import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from "./UserTable.module.scss"
import { useNavigate } from 'react-router-dom';
import showToast from '../../atoms/Toast/Toast';

const UserTable = ({ data }: any) => {
  const navigate = useNavigate()

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
          const formattedDate = new Date(value).toDateString();
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
          const formattedDate = new Date(value).toLocaleDateString();
          return formattedDate
        },
      },
      {
        Header: 'Actions',
        Cell: ({ row } : {row: any}) => {
          return (
          <div className={styles.actions}>
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
          )
        },
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
    navigate(`edit/${entry._id}`);
  };

  const handleDelete = async (entry: UserType) => {
    console.log('Delete entry:', entry);
    const res = await fetch(`http://127.0.0.1:8000/api/organisationUser/${entry._id}`, {
      method: "DELETE",
    })


    if (!res.ok) showToast("Error deleting organiation!")
    else showToast("Organisation user deleted successfully!")
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
