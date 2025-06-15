import React from 'react';
import './Table.css';

function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.Cell ? column.Cell(row[column.accessor]) : row[column.accessor]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="table-actions">
                  {onEdit && (
                    <button 
                      className="button"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      className="button button--danger"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table; 