import React, { useState } from 'react'
import type { Column, Id, Task } from '../types';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import PlusIcon from '../icons/PlusIcon';
import TaskCard from './TaskCard';

interface Props {
  column: Column;
  deleteColumn: (id:Id) => void;
  updateColumnTitle: (id:Id, title:string) => void;

  createTask: (columnId:Id) => void;
  tasks: Task[];
}

const ColumnContainer = (props: Props) => {
  const {column, deleteColumn, updateColumnTitle, createTask, tasks} = props;

  const [editMode, setEditMode] = useState(false);

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = 
  useSortable({
    id: column.id,
    data: {
      type: "Column",
      column
    },
    disabled: editMode
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if(isDragging) {
    return(
      <div
        ref={setNodeRef}
        style={style}
        className='
        bg-columnBackgroundColor
        opacity-50
        border-2 border-rose-500
        w-[350px] h-[500px]
        max-h-[500px]
        rounded-md
        flex flex-col
        '
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='
      bg-columnBackgroundColor
      w-[350px] h-[500px]
      max-h-[500px]
      rounded-md
      flex flex-col
      '
    >
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className='
        bg-mainBackgroundColor
        text-md h-[60px] p-3
        cursor-grab
        rounded-md
        rounded-b-none
        font-bold
        border-columnBackgroundColor
        border-6
        flex items-center justify-between'
      >
        <div className='flex gap-2'>
          <div className='flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full'>0</div>
          {!editMode 
            ? column.title
            : <input
              className='bg-black focus:border-rose-500 border rounded outline-none px-2'
              value={column.title}
              onChange={(e) => {
                updateColumnTitle(column.id, e.target.value)
              }}
              autoFocus
              onBlur={() => {
                setEditMode(false)
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}/>
          }

        </div>
        <button onClick={() => (
          deleteColumn(column.id)
        )}
        className='
        stroke-red-700 hover:stroke-red-300
        hover:bg-columnBackgroundColor
        rounded px-1 py-2
        cursor-pointer'>
          <TrashIcon />
        </button>
      </div>

      {/* Column Task Container */}
      <div
        className='flex grow flex-col gap-4 p-2
        overflow-x-hidden overflow-y-auto'
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Column Footer */}
      <button 
        className='
        flex gap-4 p-5
        justify-center
        cursor-pointer
        border-columnBackgroundColor border-6 rounded-md
        border-x-columnBackgroundColor hover:text-rose-500
        active:bg-mainBackgroundColor'
        onClick={() => {
          createTask(column.id)
        }}
        >
        <PlusIcon />
        Add Task
      </button>
    </div>
  )
}

export default ColumnContainer