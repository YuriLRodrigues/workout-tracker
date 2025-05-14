'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { mappingColors, mappingIcons } from '@/utils/mappings'

import { useCreateWorkoutForm } from './use-create-workout'

export const CreateWorkoutForm = () => {
  const { form, handleSubmit } = useCreateWorkoutForm()

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
                  <Input placeholder="Treino A" {...field} />
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
                  <Input placeholder="Bíceps e costas" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ícone</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full min-w-0">
                      <SelectValue
                        className="line-clamp-1 min-w-0"
                        placeholder="Selecione o ícone a ser exibido no treino"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40 min-w-0" side="top">
                    {Object.values(mappingIcons).map(({ icon, iconName, genericName }) => (
                      <SelectItem key={genericName} value={iconName}>
                        <div className="flex items-center gap-2">
                          {icon}
                          <span>{genericName}</span>
                        </div>
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
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor do ícone</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full min-w-0">
                      <SelectValue
                        className="line-clamp-1 min-w-0"
                        placeholder="Selecione a cor representada no ícone"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40 min-w-0" side="top">
                    {Object.values(mappingColors).map(({ genericName, colorCircle, colorName }) => (
                      <SelectItem key={genericName} value={colorName}>
                        <div className="flex items-center gap-2">
                          {colorCircle}
                          <span>{genericName}</span>
                        </div>
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
          <div className="col-span-2 flex w-full flex-wrap items-center justify-end pb-3">
            <Button size="sm" effect="ringHover" className="h-8 w-fit min-w-32">
              Criar treino
              <Icon name="Settings" className="mr-2" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
