import React from 'react'
import type { Column, Id } from '../types';
import TrashIcon from '../icons/TrashIcon';

interface Props {
  column: Column;
  deleteColumn: (id:Id) => void;
}

const ColumnContainer = (props: Props) => {
  const {column, deleteColumn} = props;

  return (
    <div
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
          {column.title}
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
        className='flex grow'
      >Content</div>
      {/* Column Footer */}
      <div>Footer</div>
    </div>
  )
}

export default ColumnContainer