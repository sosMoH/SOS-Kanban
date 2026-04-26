import React, { useState } from 'react'
import type { Id, Task } from '../types';
import TrashIcon from '../icons/TrashIcon';


interface Props {
  task: Task;
  deleteTask: (id:Id) => void;
}

const TaskCard = ({task, deleteTask}:Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)

  return (
    <div
    onMouseEnter={()=>{setMouseIsOver(true)}}
    onMouseLeave={()=>{setMouseIsOver(false)}} 
    className='
    bg-mainBackgroundColor
    p-2.5 h-[100px] min-h-[100px] cursor-grab
    flex text-left items-center rounded-xl
    hover:ring-2 hover:inset hover:ring-red-500
    relative'
    >
      {task.content}
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