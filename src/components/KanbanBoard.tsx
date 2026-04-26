import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon.tsx";
import type { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer.tsx";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";


const KanbanBoard = () => {
  // Columns States
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);
  const [columnsCount, setColumnsCount] = useState(0);
  const columnsId = useMemo(() => columns.map((column) => column.id), [columns])

  // Columns States
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3, // move 3px to Drag

    }
  }))


  // Tasks States
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksCount, setTasksCount] = useState(0);


  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer key={column.id} column={column} updateColumnTitle={updateColumnTitle} deleteColumn={deleteColumn} 
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}/>
              ))}
            </SortableContext>
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

        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} 
            deleteColumn={deleteColumn} 
            updateColumnTitle={updateColumnTitle}
            createTask={createTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            tasks={tasks.filter((task) => task.columnId === activeColumn.id)}/>}
          </DragOverlay>, 
          document.body
        )}
        

      </DndContext>
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

  function updateColumnTitle(id:Id, title:string) {
    const newColumns = columns.map((column) => {
      if(column.id !== id) return column;
      return{...column, title}
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    console.log("DRAGE START", event);
    if(event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if(!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }

  function createTask(columnId:Id){
    const nextTask = tasksCount + 1;

    const newTask:Task = {
      id:generateId(),
      columnId,
      content: `Task ${nextTask}`
    }

    setTasks([...tasks, newTask]);
    setTasksCount(nextTask);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id:Id, content:string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return {...task, content};
    })

    setTasks(newTasks);
  }
};

function generateId() {
  // Generate a Random Number between 0 & 10000
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
