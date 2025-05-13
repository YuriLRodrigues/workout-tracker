'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence, Transition, Variants, Variant, MotionConfig } from 'motion/react'

export type AccordionContextType = {
  expandedValue: React.Key | null
  toggleItem: (value: React.Key) => void
  variants?: { expanded: Variant; collapsed: Variant }
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider')
  }
  return context
}

export type AccordionProviderProps = {
  children: ReactNode
  variants?: { expanded: Variant; collapsed: Variant }
  expandedValue?: React.Key | null
  onValueChange?: (value: React.Key | null) => void
}

function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  onValueChange,
}: AccordionProviderProps) {
  const [internalExpandedValue, setInternalExpandedValue] = useState<React.Key | null>(null)

  const expandedValue = externalExpandedValue !== undefined ? externalExpandedValue : internalExpandedValue

  const toggleItem = (value: React.Key) => {
    const newValue = expandedValue === value ? null : value
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setInternalExpandedValue(newValue)
    }
  }

  return (
    <AccordionContext.Provider value={{ expandedValue, toggleItem, variants }}>{children}</AccordionContext.Provider>
  )
}

export type AccordionProps = {
  children: ReactNode
  className?: string
  transition?: Transition
  variants?: { expanded: Variant; collapsed: Variant }
  expandedValue?: React.Key | null
  onValueChange?: (value: React.Key | null) => void
}

function Accordion({ children, className, transition, variants, expandedValue, onValueChange }: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn('relative', className)} aria-orientation="vertical">
        <AccordionProvider variants={variants} expandedValue={expandedValue} onValueChange={onValueChange}>
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  )
}

type CustomChildProps = {
  value: string
  expanded: boolean
}

type AccordionItemProps = {
  value: string
  className?: string
  children: React.ReactElement<CustomChildProps> | React.ReactElement<CustomChildProps>[]
}

function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { expandedValue } = useAccordion()
  const isExpanded = value === expandedValue

  return (
    <div
      className={cn('overflow-hidden', className)}
      {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...(child.props as object),
            value,
            expanded: isExpanded,
          })
        }
        return child
      })}
    </div>
  )
}

export type AccordionTriggerProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordion()
  const value = (props as { value?: React.Key }).value
  const isExpanded = value === expandedValue

  return (
    <div
      onClick={() => value !== undefined && toggleItem(value)}
      aria-expanded={isExpanded}
      className={cn('group', className)}
      {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
    >
      {children}
    </div>
  )
}

export type AccordionContentProps = {
  children: ReactNode
  className?: string
}

function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  const { expandedValue, variants } = useAccordion()
  const value = (props as { value?: React.Key }).value
  const isExpanded = value === expandedValue

  const BASE_VARIANTS: Variants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  }

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  }

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={combinedVariants}
          className={cn('w-full', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
