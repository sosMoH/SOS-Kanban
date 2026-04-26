import React from 'react'
import type { Task } from '../types';


interface Props {
  task: Task;
  
}

const TaskCard = ({task}:Props) => {
  return (
    <div 
    className='
    bg-mainBackgroundColor
    p-2.5 h-[100px] min-h-[100px] cursor-grab
    flex text-left items-center rounded-xl
    hover:ring-2 hover:inset hover:ring-red-500'>
      {task.content}
    </div>
  )
}

export default TaskCard