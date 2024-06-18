'use client'

import { useState } from 'react'
import { cn } from '@nextui-org/react'

function TimeSelect() {
  const [selectedSize, setSelectedSize] = useState(2)

  return (
    <ul className='flex gap-3'>
      {['16:40', '18:00', '17:20', '21:30'].map((size, index) => (
        <li key={size}>
          <button
            onClick={() => setSelectedSize(index)}
            className={cn(
              'flex h-10 w-10 items-center justify-center  rounded-full p-2 text-sm font-semibold transition-colors',
              selectedSize === index
                ? 'bg-gray-400 text-white'
                : 'bg-transparent'
            )}
          >
            {size}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TimeSelect
