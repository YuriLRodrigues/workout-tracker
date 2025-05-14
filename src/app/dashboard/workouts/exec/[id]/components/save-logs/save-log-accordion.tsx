import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { ExecutionType } from '@/@types/exercise'
import { findTodayWorkoutSession } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'

import { SaveLogForm } from '.'

type SaveLogAccordionProps = {
  workoutId: string
  executionType: ExecutionType
  exerciseId: string
}

export const SaveLogAccordion = async ({ workoutId, exerciseId, executionType }: SaveLogAccordionProps) => {
  const { data } = await findTodayWorkoutSession({ workoutId }, { next: { tags: ['findTodayWorkoutSession'] } })
  return (
    <>
      {data?.startTime && (
        <Accordion className="flex w-full flex-col" transition={{ type: 'tween', stiffness: 120, damping: 20 }}>
          <AccordionItem value="register-execution" className="space-y-4">
            <AccordionTrigger className="mx-auto w-fit">
              <Button
                effect="shine"
                variant="outline"
                className="flex h-fit flex-wrap items-center gap-2"
                disabled={!data?.startTime}
              >
                <Icon
                  name="CirclePlus"
                  className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50"
                />
                <span className="text-wrap group-data-expanded:hidden">Registrar execução</span>
                <span className="hidden text-wrap group-data-expanded:block">Fechar registro de execução</span>
              </Button>
            </AccordionTrigger>
            <AccordionContent className={cn('origin-left p-0', !data?.startTime && 'hidden')}>
              <SaveLogForm exerciseId={exerciseId} executionType={executionType} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {!data?.startTime && (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button effect="shine" variant="outline" className="flex h-fit flex-wrap items-center gap-2">
                <Icon
                  name="CirclePlus"
                  className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50"
                />
                <span className="text-wrap">Registrar execução</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-accent text-primary max-w-[135px] py-3">
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
      )}
    </>
  )
}

export const SaveLogAccordionSkeleton = () => {
  return <Skeleton className="h-9 w-32" />
}
