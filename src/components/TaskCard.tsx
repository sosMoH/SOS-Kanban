import React, { useState } from 'react'
import type { Id, Task } from '../types';
import TrashIcon from '../icons/TrashIcon';


interface Props {
  task: Task;
  deleteTask: (id:Id) => void;
  updateTask: (id:Id, content:string) => void;
}

const TaskCard = ({task, deleteTask, updateTask}:Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  }

  if(editMode){
    return(
      <div
      className='
      bg-mainBackgroundColor
      p-2.5 h-[100px] min-h-[100px] cursor-grab
      flex text-left items-center rounded-xl
      hover:ring-2 hover:inset hover:ring-red-500
      relative'
      >
        <textarea 
        className='
        h-[90%] w-full resize-none bg-transparent
        border-none rounded-xl
        text-white
        focus:outline-none'
        value={task.content}
        autoFocus
        placeholder='Task Content Here'
        onBlur={toggleEditMode}
        onKeyDown={(e) => {
          if(e.key === "Enter" && e.shiftKey) toggleEditMode();
        }}
        onChange={(e) => updateTask(task.id, e.target.value)}>
        </textarea>
      </div>
    )
  }

  return (
    <div
    onClick={toggleEditMode}
    onMouseEnter={()=>{setMouseIsOver(true)}}
    onMouseLeave={()=>{setMouseIsOver(false)}} 
    className='
    bg-mainBackgroundColor
    p-2.5 h-[100px] min-h-[100px] cursor-grab
    flex text-left items-center rounded-xl
    hover:ring-2 hover:inset hover:ring-red-500
    relative task'
    >
      <p
      className='my-auto h-[90%] w-full
      overflow-y-auto overflow-x-hidden whitespace-pre-wrap'
      >
        {task.content}
      </p>
      {mouseIsOver &&
      (<button
      onClick={() => {
        deleteTask(task.id);
      }}
        className='
        absolute right-4
        stroke-red-700 hover:stroke-red-300
        hover:bg-columnBackgroundColor
        rounded px-1 py-2
        cursor-pointer'>
        <TrashIcon />
      </button>)}
    </div>
  )
}

export default TaskCard