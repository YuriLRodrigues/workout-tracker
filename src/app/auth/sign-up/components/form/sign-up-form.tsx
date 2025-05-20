'use client'

import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { RequiredFieldAsterisk } from '@/components/ui/required-field-asterisk'
import { Separator } from '@/components/ui/separator'

import { AnimatePresence, motion } from 'framer-motion'

import { UseSignUpForm } from './use-sign-up'

export function SignUpForm() {
  const { form, isSubmitting, onSubmit } = UseSignUpForm()

  return (
    <Form {...form}>
      <div className="relative overflow-hidden rounded-xl p-3">
        <form onSubmit={onSubmit} className="space-y-2 px-2">
          <div className="grid gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome <RequiredFieldAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
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
                  <FormLabel>
                    Sobrenome <RequiredFieldAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  E-mail <RequiredFieldAsterisk />
                </FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">
                    Senha <RequiredFieldAsterisk />
                  </FormLabel>
                  <PasswordRulesTooltip password={form.watch('password')} />
                </span>
                <FormControl>
                  <InputPassword field={field} placeholder="********" />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">
                    Confirmação de senha <RequiredFieldAsterisk />
                  </FormLabel>
                </span>
                <FormControl>
                  <InputPassword field={field} placeholder="********" />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-4">
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
                  {isSubmitting && 'Criando...'}
                  {!isSubmitting && 'Criar conta'}
                </Button>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex items-center justify-center">
              <Separator className="w-full" />
              <span className="bg-card text-muted-foreground absolute px-2 text-xs">OU</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" disabled icon={<FaGoogle />} iconPlacement="right" type="button">
                Google (em breve)
              </Button>
              <Button variant="outline" disabled icon={<FaGithub />} iconPlacement="right" type="button">
                GitHub (em breve)
              </Button>
            </div>

            <span className="mx-auto text-center">
              Já tem uma conta?
              <Button asChild effect="underline" variant="link">
                <Link href="/auth/sign-in" className="text-primary pl-2 font-bold hover:underline">
                  Entre nela por aqui!
                </Link>
              </Button>
            </span>
          </div>
        </form>
      </div>
    </Form>
  )
}
