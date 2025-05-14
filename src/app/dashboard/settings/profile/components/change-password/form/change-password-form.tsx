'use client'

import { InputPassword } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'

import { AnimatePresence, motion } from 'framer-motion'

import { useChangePasswordForm } from './use-change-password'

export const ChangePasswordForm = () => {
  const { form, handleSubmit, isLoading } = useChangePasswordForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="@container flex h-full flex-col justify-between gap-2 px-1">
        <div className="grid gap-x-5 gap-y-1 @xl:grid-cols-2 @3xl:grid-cols-3">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha atual</FormLabel>
                <FormControl>
                  <InputPassword field={field} placeholder="Digite sua senha atual" />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <InputPassword field={field} placeholder="Crie uma nova senha" />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar nova senha</FormLabel>
                <FormControl>
                  <InputPassword field={field} placeholder="Digite novamente a nova senha" />
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
            key={isLoading ? 'loading' : 'default'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Button size="sm" className="mt-auto h-8 w-fit min-w-32">
              {isLoading && <Icon name="ClockFading" className="mr-2" />}
              {!isLoading && <Icon name="LockKeyhole" className="mr-2" />}
              {isLoading && 'Atualizando...'}
              {!isLoading && 'Atualizar senha'}
            </Button>
          </motion.div>
        </AnimatePresence>
      </form>
    </Form>
  )
}
