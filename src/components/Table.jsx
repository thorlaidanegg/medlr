'use client'

import { Data } from '../../public/MOCK_DATA.json';
import * as React from "react";
import { useTable } from "react-table";


function App() {
  const data = React.useMemo(() => Data, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: 'id'
      },
      {
        Header: "Name",
        accessor: 'name'
      },
      {
        Header: "Price",
        accessor: 'price'
      },
      {
        Header: "Manufacturer",
        accessor: 'manufacturer'
      },  
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
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
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;