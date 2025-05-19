'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { ExecutionType, MuscleType } from '@/@types/exercise'
import { mappingExecutionType, mappingMuscleType } from '@/utils/mappings'
import { AnimatePresence, motion } from 'framer-motion'

import { UpdateExerciseSchemaType } from './schema'
import { useUpdateExerciseForm } from './use-update-exercise'

type UpdateExerciseFormProps = {
  exerciseId: string
  defaultValues?: UpdateExerciseSchemaType
}

export const UpdateExerciseForm = ({ exerciseId, defaultValues }: UpdateExerciseFormProps) => {
  const { form, handleSubmit, isLoading } = useUpdateExerciseForm({ defaultValues, exerciseId })

  const exerciseType = form.watch('executionType')

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="px-1">
        <div className="gap-x-5 gap-y-1 md:grid md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input autoFocus={false} placeholder="Elevação lateral" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Manter a postura correta durante toda a execução, evitar usar impulso para realizar as repetições e concentrar-se na contração muscular durante o exercício."
                    className="h-20 min-h-20 sm:h-9 sm:min-h-9"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="executionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de execução</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full min-w-0">
                      <SelectValue
                        className="line-clamp-1 min-w-0"
                        placeholder="Defina se o exercício será realizado por repetições ou por tempo."
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40 min-w-0" side="top">
                    {Object.values(ExecutionType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {mappingExecutionType[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muscleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Músculo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full min-w-0">
                      <SelectValue
                        className="line-clamp-1 min-w-0"
                        placeholder="Escolha o grupo muscular principal trabalhado neste exercício."
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40 min-w-0" side="top">
                    {Object.values(MuscleType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {mappingMuscleType[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetSets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Séries</FormLabel>
                <FormControl>
                  <Input placeholder="Quantidade de séries planejadas para este exercício." type="number" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetRepetitions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {exerciseType === ExecutionType.REPETITION
                    ? 'Repetições'
                    : exerciseType === ExecutionType.TIME
                      ? 'Tempo'
                      : 'Repetições'}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      exerciseType === ExecutionType.REPETITION
                        ? 'Número alvo de repetições para cada série.'
                        : exerciseType === ExecutionType.TIME
                          ? 'Tempo alvo em segundos.'
                          : 'Número alvo de repetições para cada série.'
                    }
                    type="number"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetResTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempo de descanso (segundos)</FormLabel>
                <FormControl>
                  <Input placeholder="Tempo de descanso entre as séries, em segundos." type="number" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoReference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referência (Youtube)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Link de um vídeo de referência que demonstre a execução correta do exercício."
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="col-span-2 flex w-full flex-wrap items-center justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLoading ? 'loading' : 'default'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Button size="sm" className="mt-auto h-8 w-fit min-w-32" disabled={isLoading}>
                  {isLoading && <Icon name="LoaderCircle" className="mr-2 animate-spin" />}
                  {!isLoading && <Icon name="Wrench" className="mr-2" />}
                  {isLoading && 'Atualizando...'}
                  {!isLoading && 'Atualizar exercício'}
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </form>
    </Form>
  )
}
