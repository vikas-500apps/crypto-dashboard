import React, { useState } from "react";

const Table = ({ data, theme }) => {
  const [sortColumn, setSortColumn] = useState("market_cap");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState([
    "name",
    "current_price",
    "market_cap",
    "total_volume",
    "price_change_percentage_24h",
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 10;

  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const allColumns = [
    "name",
    "current_price",
    "market_cap",
    "total_volume",
    "price_change_percentage_24h",
  ];

  const formatColumnName = (column) =>
    column
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div>
      <div className="relative mb-4 flex justify-end">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-200 text-black"
          }`}
          style={{ marginTop: "-3rem", marginRight: "4rem" }} // Test inline styles
        >
          Select Columns
        </button>

        {dropdownOpen && (
          <div
            className={`absolute mt-2 border rounded shadow-md z-10 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-200 text-black"
            }`}
          >
            {allColumns.map((column) => (
              <label
                key={column}
                className={`flex items-center px-4 py-2 hover:${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column)}
                  onChange={() => toggleColumn(column)}
                  className="mr-2"
                />
                {formatColumnName(column)}
              </label>
            ))}
          </div>
        )}
      </div>
      <div
        className={`overflow-x-auto ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table
          className={`min-w-full divide-y ${
            theme === "dark" ? "divide-gray-700" : "divide-gray-200"
          }`}
        >
          <thead className={theme === "dark" ? "bg-gray-700" : "bg-gray-50"}>
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  } uppercase tracking-wider cursor-pointer`}
                >
                  {formatColumnName(column)}
                  {sortColumn === column &&
                    (sortDirection === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            {paginatedData.map((coin) => (
              <tr key={coin.id}>
                {visibleColumns.map((column) => (
                  <td
                    key={column}
                    className={`px-6 py-4 whitespace-nowrap ${
                      theme === "dark" ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {column === "current_price" ||
                    column === "market_cap" ||
                    column === "total_volume"
                      ? `$${coin[column].toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}`
                      : column === "price_change_percentage_24h"
                      ? `${coin[column].toFixed(2)}%`
                      : coin[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-200 text-black"
          } disabled:opacity-50`}
        >
          Previous
        </button>
        <span
          className={`self-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Page {page} of {Math.ceil(sortedData.length / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setPage(
              Math.min(Math.ceil(sortedData.length / itemsPerPage), page + 1)
            )
          }
          disabled={page === Math.ceil(sortedData.length / itemsPerPage)}
          className={`px-4 py-2 rounded ${
            theme === "dark"
               ? "bg-gray-700 text-gray-300"
              : "bg-gray-200 text-black"
          }  disabled:opacity-50`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table; 