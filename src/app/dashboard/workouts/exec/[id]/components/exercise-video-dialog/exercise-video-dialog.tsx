'use client'

import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

import { PlayVideoButton } from './play-video-button'

interface ExerciseVideoDialogProps {
  videoReference?: string
}

export function ExerciseVideoDialog({ videoReference }: ExerciseVideoDialogProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !videoReference) {
    return null
  }

  if (!videoReference) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PlayVideoButton onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AnimatePresence>
          {open && (
            <DialogContent className="overflow-hidden border-none bg-black p-0 sm:max-w-[800px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="relative aspect-video w-full"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 z-10 rounded-full bg-black/70 p-1.5 text-white transition-colors hover:bg-black/90"
                >
                  <X className="h-5 w-5" />
                </button>
                <ReactPlayer
                  url={videoReference}
                  width="100%"
                  height="100%"
                  controls
                  playing={open}
                  config={{
                    youtube: {
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    },
                  }}
                />
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export const ExerciseVideoDialogSkeleton = () => {
  return (
    <div className="flex items-center gap-1">
      <Skeleton className="size-9 rounded-full" />
      <Skeleton className="size-5 rounded-full" />
    </div>
  )
}
