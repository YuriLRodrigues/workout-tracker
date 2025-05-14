'use client'

import { useTheme } from 'next-themes'
import { ComponentProps, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'

type ThemeSwitcherProps = ComponentProps<'div'>

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <ThemeSwitcherSkeleton />

  const isDark = resolvedTheme === 'dark'

  return (
    <div
      className={cn(
        'relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300 p-1 dark:from-zinc-800 dark:to-zinc-900',
        className,
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {isDark ? <Moon className="h-4 w-4 text-gray-700" /> : <Sun className="h-4 w-4 text-gray-500" />}
      </div>
    </div>
  )
}

export const ThemeSwitcherSkeleton = () => {
  return (
    <div className="relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300 p-1 dark:from-zinc-800 dark:to-zinc-900">
      <div className="flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-white shadow-md" />
    </div>
  )
}
