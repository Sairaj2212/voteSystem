import React from 'react';
import VerticalMenu from './VerticalMenu';
import { useState, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import Select from 'react-select';
import './AdminCss/Results.css';

const data = [
  {
    id: '1',
    image: 'https://via.placeholder.com/150',
    name: 'John Doe',
    constituency: 'Constituency 1',
    party: 'Party A',
    votes: 1000,
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    name: 'Jane Smith',
    constituency: 'Constituency 2',
    party: 'Party B',
    votes: 1500,
  },
  // Add more data as needed
];

const Results = () => {
  const [filterConstituency, setFilterConstituency] = useState(null);
  const [filterParty, setFilterParty] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: 'Nomination ID',
        accessor: 'id',
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ cell: { value } }) => <img src={value} alt="Candidate" />,
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Constituency',
        accessor: 'constituency',
      },
      {
        Header: 'Party',
        accessor: 'party',
      },
      {
        Header: 'Votes Casted',
        accessor: 'votes',
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        (!filterConstituency || item.constituency === filterConstituency.value) &&
        (!filterParty || item.party === filterParty.value)
      );
    });
  }, [filterConstituency, filterParty]);

  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const constituencyOptions = [
    ...new Set(data.map(item => item.constituency))
  ].map(value => ({ value, label: value }));

  const partyOptions = [
    ...new Set(data.map(item => item.party))
  ].map(value => ({ value, label: value }));

  return (
    <>
      <VerticalMenu />
      <div className="results-container">
        <div className="filters">
          <Select
            options={constituencyOptions}
            onChange={setFilterConstituency}
            placeholder="Filter by Constituency"
            isClearable
          />
          <Select
            options={partyOptions}
            onChange={setFilterParty}
            placeholder="Filter by Party"
            isClearable
          />
        </div>
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Results;
