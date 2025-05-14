'use client'
import { ptBR as dayPickerPtBR } from 'react-day-picker/locale'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import { UserGender } from '@/@types/user'
import { cn } from '@/lib/utils'
import { mappingGender } from '@/utils/mappings'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useUpdatePersonalInfoForm } from './use-updated-personal-info'

export const UpdatePersonalInfoForm = () => {
  const { form, handleSubmit, isLoading } = useUpdatePersonalInfoForm()

  if (isLoading) return <UpdatePersonalInfoFormSkeleton />

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="@container flex h-full flex-col justify-between px-1">
        <div className="grid gap-x-5 gap-y-1 @xl:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o seu nome" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o seu sobrenome" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full min-w-0">
                      <SelectValue
                        className="line-clamp-1 min-w-0"
                        placeholder={field.value ? mappingGender[field.value] : 'Insira o seu gênero.'}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-32 min-w-0" side="top">
                    {Object.values(UserGender).map((gender) => (
                      <SelectItem
                        key={gender}
                        value={gender}
                        className={cn('my-1', field.value === gender && 'bg-foreground/10')}
                      >
                        {mappingGender[gender]}
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
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Telefone</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    defaultCountry="BR"
                    autoComplete="none"
                    placeholder="Insira o número de telefone"
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
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col @sm:col-span-2 @2xl:col-span-1">
                <FormLabel>Aniversário</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'bg-muted w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <Icon name="Calendar" className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={dayPickerPtBR}
                      mode="single"
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    />
                  </PopoverContent>
                </Popover>
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

const UpdatePersonalInfoFormSkeleton = () => {
  return (
    <div className="@container flex h-full flex-col justify-between space-y-7 px-1">
      <div className="grid gap-5 gap-y-9 @xl:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
        <div className="space-y-1.5 @sm:col-span-2 @2xl:col-span-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
      <Skeleton className="mt-auto h-9 w-full" />
    </div>
  )
}
