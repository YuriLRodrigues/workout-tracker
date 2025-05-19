'use client'

import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { AnimatePresence, motion } from 'framer-motion'

import { UseSignInForm } from './use-sign-in'

export function SignInForm() {
  const { form, isSubmitting, onSubmit } = UseSignInForm()

  return (
    <Form {...form}>
      <div className="relative overflow-hidden rounded-xl p-3">
        <form onSubmit={onSubmit} className="px-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">Senha:</FormLabel>
                  <PasswordRulesTooltip password={form.watch('password')} />
                </span>
                <FormControl>
                  <InputPassword field={field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="!m-0 flex flex-col space-y-4">
            <div className="flex w-full items-center justify-end">
              <Button type="button" variant="link" effect="underline" asChild>
                <Link href="/auth/forgot-password">Esqueci minha senha</Link>
              </Button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={isSubmitting ? 'loading' : 'default'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Button size="sm" className="mt-auto h-8 w-full min-w-32" disabled={isSubmitting}>
                  {isSubmitting && <Icon name="ClockFading" className="mr-2 animate-pulse" />}
                  {!isSubmitting && <Icon name="Check" className="mr-2" />}
                  {isSubmitting && 'Acessando...'}
                  {!isSubmitting && 'Acessar'}
                </Button>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex items-center justify-center">
              <Separator className="w-full" />
              <span className="bg-card text-muted-foreground absolute px-2 text-xs">OU</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" icon={<FaGoogle />} iconPlacement="right" type="button" disabled>
                Google (em breve)
              </Button>
              <Button variant="outline" icon={<FaGithub />} iconPlacement="right" type="button" disabled>
                GitHub (em breve)
              </Button>
            </div>

            <span className="mx-auto text-center">
              Ainda não possui uma conta?
              <Button asChild effect="underline" variant="link">
                <Link href="/auth/sign-up" className="text-primary pl-2 font-bold hover:underline">
                  Crie uma aqui!
                </Link>
              </Button>
            </span>
          </div>
        </form>
      </div>
    </Form>
  )
}
