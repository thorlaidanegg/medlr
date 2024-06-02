'use client'
import { Data } from '../../public/MOCK_DATA.json';
import React from "react";
import { useTable } from "react-table";



function App() {
  
  const data = React.useMemo(() => Data, []);
  const [records, setRecords] = React.useState(data);
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

  const filter = (e) => {
    const searchText = e.target.value.toLowerCase();
    setRecords(data.filter(f => f.name.toLowerCase().startsWith(searchText)));
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: records });

  return (
    <div className="App">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-200 rounded-lg shadow-md"
          onChange={filter}
          placeholder="Search by name..."
        />
        <table
          {...getTableProps()}
          className="table-fixed w-full rounded-lg overflow-hidden shadow-md"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-blue-900 text-white"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 text-left"
                  >
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
                <tr {...row.getRowProps()} className=" hover:bg-slate-50">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-4"
                      style={{ backgroundColor: "#E2F0CB" }}
                    >
                      {cell.render("Cell")}
                    </td>
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

