'use client'

import { useEffect, useState } from 'react'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { HTMLMotionProps, motion } from 'framer-motion'

type AnimatedContainerContentProps = HTMLMotionProps<'section'> & {
  SkeletonBase: ReactNode
}

export const AnimatedContainerContent = ({
  className,
  children,
  SkeletonBase,
  ...props
}: AnimatedContainerContentProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return SkeletonBase

  return (
    <motion.section
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('w-full space-y-3', className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}
