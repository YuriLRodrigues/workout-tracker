import { ComponentProps, ReactNode } from 'react'

import { AnimationType, AnimationVariant, TextAnimate } from '@/components/magicui/text-animate'

import { cn } from '@/lib/utils'

type ContainerTitleProps = ComponentProps<'h1'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  animationVariant?: AnimationVariant
  animationType?: AnimationType
  children: ReactNode
}

export const ContainerTitle = ({
  className,
  as: Tag = 'h1',
  animationType = 'character',
  animationVariant = 'blurInUp',
  children,
  ...props
}: ContainerTitleProps) => {
  return (
    <Tag className={cn('text-4xl font-bold tracking-tight', className)} {...props}>
      <TextAnimate animation={animationVariant} by={animationType} once>
        {children}
      </TextAnimate>
    </Tag>
  )
}
