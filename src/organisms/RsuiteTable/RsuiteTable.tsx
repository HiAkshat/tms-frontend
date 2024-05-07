import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Pagination, IconButton, Whisper } from 'rsuite';
import { SortType } from 'rsuite/esm/Table';
import showToast from '../../atoms/Toast/Toast';
import organisationServices from '../../services/organisation';

const { Column, HeaderCell, Cell } = Table;

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

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
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
      await organisationServices.deleteOrganisation(id)
      showToast("Organisation deleted successfully!")
    } catch (error) {
      showToast("Error deleting organisation!")
    }
  };

  return (
    <Table
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      height={400}
      data={getData()}
      onRowClick={rowData => {
        console.log(rowData);
      }}
    >
      <Column flexGrow={3} align="center" sortable>
        <HeaderCell>Organisation Name</HeaderCell>
        <Cell dataKey="organisation_name" />
      </Column>
      <Column flexGrow={3} align="center" sortable>
        <HeaderCell>Display Name</HeaderCell>
        <Cell dataKey="display_name" />
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>Actions</HeaderCell>
        <ActionCell dataKey="_id" rowData={undefined} />
      </Column>
    </Table>
  )
}
