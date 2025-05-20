'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function WarningLogTooltip() {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggleTooltip = () => setTooltipOpen((prev) => !prev)
  const closeTooltip = () => setTooltipOpen(false)

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>
          <Button
            effect="shine"
            variant="outline"
            className="group mx-auto flex h-fit w-fit flex-wrap items-center gap-2"
            onClick={toggleTooltip}
            onMouseLeave={closeTooltip}
          >
            <Icon
              name="CirclePlus"
              className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50"
            />
            <span className="text-wrap">Registrar execução</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-accent text-primary max-w-[135px] py-3" side="top">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="Info" className="size-5 text-yellow-600" />
              <p className="font-bold">Atenção</p>
            </div>
            <p className="w-full text-justify break-words hyphens-auto">
              Você deve iniciar um treino para registrar a execução de um exercício.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const WarningLogTooltipSkeleton = () => {
  return (
    <Button
      effect="shine"
      variant="outline"
      disabled
      className="group mx-auto flex h-fit w-fit flex-wrap items-center gap-2"
    >
      <Icon
        name="CirclePlus"
        className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50"
      />
      <span className="text-wrap">Registrar execução</span>
    </Button>
  )
}
