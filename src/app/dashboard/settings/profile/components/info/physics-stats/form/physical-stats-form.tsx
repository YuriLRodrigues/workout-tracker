'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { RequiredFieldAsterisk } from '@/components/ui/required-field-asterisk'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

import { AnimatePresence, motion } from 'framer-motion'

import { usePhysicalStatsForm } from './use-physical-stats-form'

export const PhysicalStatsForm = () => {
  const { form, handleSubmit, isLoading, requestIsSending } = usePhysicalStatsForm()

  if (isLoading) return <PhysicalStatsFormSkeleton />

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="@container flex h-full flex-col justify-between px-1">
        <div className="grid gap-x-5 gap-y-1 @md:grid-cols-2">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Altura (cm) <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insira a sua altura" type="number" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Peso (kg) <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Insira o seu peso" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Idade <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Insira a sua idade" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bodyFat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentual de gordura</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o seu percentual de gordura" type="number" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muscleMass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Massa muscular</FormLabel>
                <FormControl>
                  <Input placeholder="Insira a sua massa muscular" type="number" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Objetivo(s) <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: Ganhar massa muscular e melhorar condicionamento físico"
                    className="h-20 min-h-20 @sm:h-9 @sm:min-h-9"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={requestIsSending ? 'loading' : 'default'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Button size="sm" className="mt-auto h-8 w-full min-w-32" disabled={requestIsSending}>
              {requestIsSending && <Icon name="ClockFading" className="mr-2" />}
              {!requestIsSending && <Icon name="Save" className="mr-2" />}
              {requestIsSending && 'Salvando...'}
              {!requestIsSending && 'Salvar alterações'}
            </Button>
          </motion.div>
        </AnimatePresence>
      </form>
    </Form>
  )
}

const PhysicalStatsFormSkeleton = () => {
  return (
    <div className="@container flex h-full flex-col justify-between px-1">
      <div className="grid space-y-7 gap-x-5 gap-y-1 @md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-auto h-9 w-full" />
    </div>
  )
}
