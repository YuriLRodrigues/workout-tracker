'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { RequiredFieldAsterisk } from '@/components/ui/required-field-asterisk'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

import { usePhysicalStatsForm } from './use-physical-stats-form'

export const PhysicalStatsForm = () => {
  const { form, handleSubmit, isLoading } = usePhysicalStatsForm()

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
                  <Input placeholder="Insira o seu peso" {...field} />
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
                  <Input placeholder="Insira a sua idade" {...field} />
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

        <Button size="sm" className="mt-auto h-8 w-full min-w-32">
          <Icon name="Save" className="mr-2" />
          Salvar alterações
        </Button>
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
