'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@nextui-org/button'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex gap-4'>
      <Button size='sm' variant='flat' onClick={() => setTheme('light')}>
        Sáng
      </Button>
      <Button size='sm' variant='flat' onClick={() => setTheme('dark')}>
        Tối
      </Button>
      <Button size='sm' variant='flat' onClick={() => setTheme('modern')}>
        Hiện đại
      </Button>
    </div>
  )
}
