'use client'
import { Data } from '../../public/MOCK_DATA.json';
import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

function App() {
  
  const data = useMemo(() => Data, []);
  const [records, setRecords] = useState(data);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [manufacturer, setManufacturer] = useState('');
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
    const filteredData = data.filter(f => f.name.toLowerCase().startsWith(searchText));
  
  
    let filteredRecords = filteredData;
  
    if (minPrice !== '') {
      filteredRecords = filteredRecords.filter(item => item.price >= parseInt(minPrice));
    }
  
    if (maxPrice !== '') {
      filteredRecords = filteredRecords.filter(item => item.price <= parseInt(maxPrice));
    }
  
    if (manufacturer !== '') {
      filteredRecords = filteredRecords.filter(item => item.manufacturer.toLowerCase().includes(manufacturer.toLowerCase()));
    }
  
    setRecords(filteredRecords); 
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state:{pageIndex},
    pageCount,
    gotoPage
  } = useTable({ columns, data: records,initialState:{pageSize: 6} }, useSortBy, usePagination);

  return (
    <div className="App">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl text-pretty ">Search By Name:</h1>
        <input
          type="text"
          className="w-full p-2 mb-7 bg-gray-300 rounded-lg shadow-md"
          onChange={filter}
          placeholder="Search by name..."
        />

        <h1 className="text-pretty text-2xl">Filter:</h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="text"
              className="w-full p-2 mb-2 sm:mb-0 bg-gray-300 rounded-lg shadow-md"
              onChange={(e) => setManufacturer(e.target.value)}
              value={manufacturer}
              placeholder="Search by manufacturer..."
            />
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="number"
              className="w-full p-2 mb-2 sm:mb-0 bg-gray-300 rounded-lg shadow-md"
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
              placeholder="Min Price"
            />
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="number"
              className="w-full p-2 mb-2 sm:mb-0 bg-gray-300 rounded-lg shadow-md"
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
              placeholder="Max Price"
            />
          </div>
          <button
            className="px-5 py-2 rounded-lg bg-blue-800 hover:bg-blue-400 text-white sm:ml-4"
            onClick={filter}
          >
            Apply Filters
          </button>
        </div>

        <div className="table-responsive overflow-x-auto"> {/* Add a container for table responsiveness */}
          <table
            {...getTableProps()}
            className="table-fixed w-full rounded-lg overflow-hidden shadow-md"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-blue-900 text-white "
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-3 text-left"
                    >
                      {column.render("Header")}
                      {
                        column.isSorted && <span>{column.isSortedDesc ? " 🔽" : " 🔼"}</span>
                      }
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-slate-50">
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

        <div className="flex flex-col sm:flex-row justify-center items-center mt-8">
          <button disabled={pageIndex===0} onClick={()=>gotoPage(0)} className="px-5 py-2 rounded-lg bg-blue-800 hover:bg-blue-400 text-white mb-4 sm:mb-0 sm:mr-4 disabled:cursor-not-allowed">First</button>
          <button disabled={!canPreviousPage} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-400 text-white mb-4 sm:mb-0 sm:mr-4 disabled:cursor-not-allowed" onClick={previousPage}>Prev</button>
          <span className="m-2">{pageIndex+1} of {pageCount}</span>
          <button disabled={!canNextPage} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-400 text-white mb-4 sm:mb-0 sm:ml-4 disabled:cursor-not-allowed" onClick={nextPage}>Next</button>
          <button disabled={pageIndex === pageCount - 1} onClick={()=>gotoPage(pageCount-1)} className="px-5 py-2 rounded-lg bg-blue-800 hover:bg-blue-400 text-white sm:ml-4 disabled:cursor-not-allowed">Last</button>
        </div>
      </div>
    </div>
  );
}

export default App;
