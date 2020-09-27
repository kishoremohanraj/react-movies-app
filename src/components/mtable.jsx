import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const MTable = ({ data, columns, sortColumn, onSort }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default MTable;
