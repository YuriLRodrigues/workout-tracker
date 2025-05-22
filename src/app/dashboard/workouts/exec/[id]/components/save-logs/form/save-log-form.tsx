'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { RequiredFieldAsterisk } from '@/components/ui/required-field-asterisk'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

import { ExecutionType } from '@/@types/exercise'

import { EffortLevelSlider } from './effort-level-slider'
import { useSaveLogForm } from './use-save-log'

type SaveLogFormProps = {
  exerciseId: string
  executionType: ExecutionType
}

export const SaveLogForm = ({ exerciseId, executionType }: SaveLogFormProps) => {
  const { form, handleSubmit, exerciseIsCompleted, isLoading, effortLevel, setEffortLevel, isSendingRequest } =
    useSaveLogForm({
      exerciseId,
    })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="@container px-1">
        <div className="grid gap-x-5 gap-y-1 @xs:grid-cols-2">
          <FormField
            control={form.control}
            name="maxWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="min-h-[25px]">
                  {executionType === ExecutionType.TIME ? 'Tempo (segundos)' : 'Carga (kg)'} <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input disabled={exerciseIsCompleted} placeholder="80" type="number" min={0} {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxSeries"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="min-h-[25px]">
                  Séries <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input disabled={exerciseIsCompleted} placeholder="4" type="number" min={0} {...field} {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="min-h-[25px]">
                  Repetições <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input disabled={exerciseIsCompleted} placeholder="12" type="number" min={0} {...field} {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="averageRestTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="min-h-[25px]">
                  Tempo de descanso (segundos) <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input disabled={exerciseIsCompleted} placeholder="60" type="number" min={0} {...field} {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <EffortLevelSlider onChange={setEffortLevel} value={effortLevel} />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="@xs:col-span-2">
                <FormLabel className="min-h-[25px]">Anotação</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Senti dor durante a execução."
                    className="h-20 min-h-20 sm:h-9 sm:min-h-9"
                    disabled={exerciseIsCompleted}
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="col-span-full flex w-full flex-wrap items-center justify-end">
            {isLoading && <Skeleton className="h-8 w-fit min-w-32" />}
            {!exerciseIsCompleted && !isLoading && (
              <Button
                size="sm"
                className="flex h-8 w-fit min-w-0 items-center justify-center sm:min-w-32"
                disabled={isSendingRequest}
              >
                <span className="text-wrap">Completar exercício</span>
                <Icon name="Save" className="mr-2" />
              </Button>
            )}
            {exerciseIsCompleted && (
              <Button
                disabled
                size="sm"
                className="flex h-8 w-fit min-w-0 items-center justify-center border border-green-700 bg-green-100 text-wrap text-green-700 sm:min-w-32"
              >
                <span className="text-wrap"> Exercício já finalizado</span>
                <Icon name="Save" className="mr-2" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export const SaveLogFormSkeleton = () => {
  return (
    <div className="gap-x-5 gap-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
      <div className="col-span-full flex w-full flex-wrap items-center justify-end">
        <Skeleton className="h-8 w-20 min-w-32" />
      </div>
    </div>
  )
}
