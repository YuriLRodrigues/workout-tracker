'use client'
import type React from 'react'
import { useEffect, useMemo, useRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { useInView, useAnimation, motion, type Variants } from 'framer-motion'

interface ScaleInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  scaleFrom?: number
  className?: string
  once?: boolean
  as?: React.ElementType
  asChild?: boolean
}

const AnimateScaleIn: React.FC<ScaleInProps> = ({
  children,
  duration = 0.5,
  delay = 0,
  scaleFrom = 0.8,
  className = '',
  once = true,
  as: Component = 'div',
  asChild = false,
}) => {
  const controls = useAnimation()

  const Comp = asChild ? Slot : Component
  const MotionComponent = useMemo(() => motion.create(Comp), [Comp])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [inView, controls, once])

  const variants: Variants = {
    hidden: { scale: scaleFrom, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  return (
    <MotionComponent ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </MotionComponent>
  )
}

export default AnimateScaleIn
