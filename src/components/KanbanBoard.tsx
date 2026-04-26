import { useState } from "react";
import PlusIcon from "../icons/PlusIcon.tsx";
import type { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer.tsx";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);
  const [columnsCount, setColumnsCount] = useState(0);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer column={column} deleteColumn={deleteColumn} key={column.id} />
          ))}
        </div>

        <button
          onClick={() => {
            createNewColumn();
          }}
          className="
          h-15 w-[350px] min-w-[350px] p-4
          cursor-pointer
          rounded-lg
          bg-mainBackgroundColor
          border-2 border-columnBackgroundColor
          ring-rose-500 hover:ring-2
          flex justify-center gap-[20px]"
        >
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );

  function createNewColumn() {
    const nextNumber = columnsCount + 1;

    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${nextNumber}`,
    };

    setColumns([...columns, columnToAdd]);
    setColumnsCount(nextNumber);
  }

  function deleteColumn(id:Id) {
    const filteredColumns = columns.filter((column) => (column.id !== id))
    setColumns(filteredColumns);
  }
};

function generateId() {
  // Generate a Random Number between 0 & 10000
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
