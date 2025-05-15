import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { ExecutionType } from '@/@types/exercise'
import { findTodayWorkoutSession } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'

import { SaveLogForm } from '.'
import { WarningLogTooltip } from './warning-log-tooltip'

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

      {!data?.startTime && <WarningLogTooltip />}
    </>
  )
}

export const SaveLogAccordionSkeleton = () => {
  return <Skeleton className="h-9 w-32" />
}
