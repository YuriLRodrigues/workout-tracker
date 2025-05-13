'use client'

import type React from 'react'
import { useEffect, useMemo, useRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { useInView, useAnimation, motion, type Variants } from 'framer-motion'

// Tipos de animação suportados
export type AnimationType = 'fade' | 'scale' | 'slide' | 'rotate' | 'flip' | 'bounce'

// Direções para animações que suportam direção
export type AnimationDirection = 'up' | 'down' | 'left' | 'right'

export interface AnimateProps {
  children: React.ReactNode
  type?: AnimationType
  direction?: AnimationDirection
  duration?: number
  delay?: number
  amount?: number // Valor genérico para escala, distância, ângulo, etc.
  className?: string
  once?: boolean
  as?: React.ElementType
  asChild?: boolean
  threshold?: number // Quantidade do elemento que precisa estar visível para disparar a animação
  exitAnimation?: boolean // Ativar animação de saída quando o elemento sai da viewport
}

const Animate: React.FC<AnimateProps> = ({
  children,
  type = 'fade',
  direction = 'up',
  duration = 0.5,
  delay = 0,
  amount = 0.2,
  className = '',
  once = true,
  as: Component = 'div',
  asChild = false,
  threshold = 0.1,
  exitAnimation = true,
}) => {
  const controls = useAnimation()
  const Comp = asChild ? Slot : Component
  const MotionComponent = useMemo(() => motion.create(Comp), [Comp])
  const ref = useRef(null)

  // Configuração do inView para detectar quando o elemento entra/sai da viewport
  const inView = useInView(ref, {
    once: exitAnimation ? false : once,
    amount: threshold,
  })

  // Efeito para controlar a animação baseado na visibilidade
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!once || exitAnimation) {
      controls.start('hidden')
    }
  }, [inView, controls, once, exitAnimation])

  // Gera as variantes de animação com base no tipo selecionado
  const variants = useMemo((): Variants => {
    // Valores padrão para hidden e visible
    const hidden: any = { opacity: 0 }
    const visible: any = {
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Ease out cubic
      },
    }

    const flip = 90 * amount
    const rotation = 90 * amount
    const distance = 50 * amount

    // Configurações específicas para cada tipo de animação
    switch (type) {
      case 'fade':
        // Já temos as configurações básicas de opacidade
        break

      case 'scale':
        hidden.scale = 1 - amount
        visible.scale = 1
        break

      case 'slide':
        if (direction === 'up') hidden.y = distance
        if (direction === 'down') hidden.y = -distance
        if (direction === 'left') hidden.x = distance
        if (direction === 'right') hidden.x = -distance

        if (direction === 'up' || direction === 'down') visible.y = 0
        if (direction === 'left' || direction === 'right') visible.x = 0
        break

      case 'rotate':
        hidden.rotate = direction === 'left' ? -rotation : rotation
        visible.rotate = 0
        break

      case 'flip':
        if (direction === 'up' || direction === 'down') {
          hidden.rotateX = direction === 'down' ? flip : -flip
          visible.rotateX = 0
        } else {
          hidden.rotateY = direction === 'right' ? -flip : flip
          visible.rotateY = 0
        }
        break

      case 'bounce':
        // Para bounce, usamos uma configuração especial de transição
        hidden.y = direction === 'up' ? 20 * amount : -20 * amount
        hidden.x = direction === 'left' ? 20 * amount : direction === 'right' ? -20 * amount : 0
        visible.y = 0
        visible.x = 0
        visible.transition = {
          ...visible.transition,
          type: 'spring',
          stiffness: 300,
          damping: 10,
        }
        break
    }

    return {
      hidden,
      visible,
    }
  }, [type, direction, amount, duration, delay])

  return (
    <MotionComponent ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </MotionComponent>
  )
}

export default Animate
