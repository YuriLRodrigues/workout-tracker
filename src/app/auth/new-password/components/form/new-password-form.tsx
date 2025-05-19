'use client'

import Link from 'next/link'

import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'

import { AnimatePresence, motion } from 'framer-motion'

import { useNewPassword } from './use-new-password'

export const NewPasswordForm = () => {
  const { form, onSubmit, isSubmitting } = useNewPassword()

  return (
    <Form {...form}>
      <div className="relative overflow-hidden py-4 md:rounded-xl">
        <form onSubmit={onSubmit} className="flex flex-col space-y-6 px-2">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">Senha</FormLabel>
                  <PasswordRulesTooltip password={form.watch('newPassword')} />
                </span>
                <FormControl>
                  <InputPassword field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">Confirme a sua senha</FormLabel>
                </span>
                <FormControl>
                  <InputPassword field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between">
            <Button
              variant="outline"
              type="button"
              icon={<Icon name="ArrowLeft" />}
              effect="ringHover"
              className="h-8 w-full sm:w-fit"
              iconPlacement="left"
              asChild
            >
              <Link href="/">Voltar para o site</Link>
            </Button>

            <AnimatePresence mode="wait">
              <motion.div
                key={isSubmitting ? 'loading' : 'default'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-fit"
              >
                <Button size="sm" className="mt-auto h-8 w-full min-w-32 sm:w-fit" disabled={isSubmitting}>
                  {isSubmitting && <Icon name="ClockFading" className="mr-2 animate-pulse" />}
                  {!isSubmitting && <Icon name="LockKeyholeOpen" className="mr-2" />}
                  {isSubmitting && 'Confirmando...'}
                  {!isSubmitting && 'Confirmar alteração de senha'}
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </form>
      </div>
    </Form>
  )
}
