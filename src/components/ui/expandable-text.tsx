'use client'

import { type ComponentProps, type ReactNode, useState, useRef, useEffect } from 'react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

interface ExpandableTextProps {
  children: ReactNode
  maxLines?: number
  className?: ComponentProps<'div'>['className']
  asChild?: boolean
  type?: 'dot' | 'label'
}

export function ExpandableText({
  children,
  type = 'label',
  maxLines = 2,
  className,
  asChild = false,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const hiddenTextRef = useRef<HTMLDivElement>(null)

  // Método mais robusto para detectar truncamento
  useEffect(() => {
    const checkIfTruncated = () => {
      if (!textRef.current || !hiddenTextRef.current) return

      // Se já está expandido, não precisamos verificar
      if (isExpanded) {
        setIsTruncated(true)
        return
      }

      // Comparar a altura do texto truncado com a altura do texto completo
      const truncatedHeight = textRef.current.clientHeight
      const fullHeight = hiddenTextRef.current.clientHeight

      // Se a altura do texto truncado for menor que a altura do texto completo,
      // então o texto está sendo truncado
      const isTruncated = truncatedHeight < fullHeight
      setIsTruncated(isTruncated)
    }

    // Usar um timeout maior para garantir que o DOM foi renderizado completamente
    // e os estilos foram aplicados
    const timeoutId = setTimeout(checkIfTruncated, 100)

    // Verificar novamente se a janela for redimensionada
    window.addEventListener('resize', checkIfTruncated)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkIfTruncated)
    }
  }, [children, maxLines, isExpanded])

  const Comp = asChild ? Slot : 'div'

  return (
    <div ref={containerRef} className={cn('relative break-all', className)}>
      {/* Texto visível (potencialmente truncado) */}
      <div className="relative">
        <div
          ref={textRef}
          className={cn(
            !isExpanded && `line-clamp-${maxLines}`,
            type === 'dot' && !isExpanded && isTruncated && 'pr-6',
          )}
        >
          <Comp className="break-all">{children}</Comp>
        </div>

        {/* Botões de controle */}
        {type === 'label' && isTruncated && (
          <Button
            variant="link"
            size="sm"
            className={cn('h-auto px-0 font-medium')}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </Button>
        )}

        {type === 'dot' && isTruncated && (
          <Button
            variant="link"
            className={cn(
              'h-fit min-h-0 p-0 font-medium',
              !isExpanded && 'absolute right-0 bottom-0.5',
              isExpanded && 'mt-1 block',
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className={cn('text-primary text-xs hover:underline', !isExpanded && 'px-1')}>
              {isExpanded ? 'Ver menos' : '...'}
            </span>
          </Button>
        )}
      </div>

      {/* Texto oculto para comparação (sem truncamento) */}
      <div
        ref={hiddenTextRef}
        className="pointer-events-none absolute h-auto overflow-visible opacity-0"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
          top: '-9999px',
          left: '-9999px',
        }}
        aria-hidden="true"
      >
        <Comp className="break-all">{children}</Comp>
      </div>
    </div>
  )
}
