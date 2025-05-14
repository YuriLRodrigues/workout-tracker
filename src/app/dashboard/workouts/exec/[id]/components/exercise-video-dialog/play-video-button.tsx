'use client'

import { useState } from 'react'

import { Icon } from '@/components/ui/icon'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

type PlayVideoButtonProps = {
  onClick: () => void
  className?: string
  videoTitle?: string
  duration?: string
}

export const PlayVideoButton = ({ onClick, className }: PlayVideoButtonProps) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <motion.button
          onClick={onClick}
          className={cn(
            'relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
            className,
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon name="Play" className="ml-1 h-5 w-5" />
          <motion.span
            className="absolute inset-0 rounded-full bg-red-500 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
            }}
          />
        </motion.button>

        <motion.button
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-neutral-600 dark:bg-neutral-700 dark:text-gray-300"
          whileHover={{ scale: 1.1 }}
        >
          <Icon name="Info" className="h-3 w-3" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-muted pointer-events-none absolute right-0 bottom-full z-10 mb-2 w-48 rounded p-2 text-xs"
          >
            Este vídeo contém informações importantes sobre o exercício. Clique para visualizar a demonstração completa.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
