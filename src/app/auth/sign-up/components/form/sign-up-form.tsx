'use client'

import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

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
                  <FormLabel>Nome</FormLabel>
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
                  <FormLabel>Sobrenome</FormLabel>
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
                <FormLabel>E-mail</FormLabel>
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
                  <FormLabel className="font-semibold">Senha:</FormLabel>
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
                  <FormLabel className="font-semibold">Confirmação de senha:</FormLabel>
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
            <Button
              type="submit"
              icon={<Icon name="Check" />}
              iconPlacement="left"
              effect="ringHover"
              className="h-8"
              disabled={isSubmitting}
            >
              Criar conta
            </Button>

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
