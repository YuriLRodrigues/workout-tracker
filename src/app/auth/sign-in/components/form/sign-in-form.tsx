'use client'

import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { UseSignInForm } from './use-sign-in'

export function SignInForm() {
  const { form, isSubmitting, onSubmit } = UseSignInForm()

  return (
    <Form {...form}>
      <div className="relative overflow-hidden rounded-xl p-3">
        <form onSubmit={onSubmit} className="space-y-6 px-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              icon={<Icon name="Check" />}
              iconPlacement="left"
              effect="ringHover"
              className="h-8"
              disabled={isSubmitting}
            >
              Acessar
            </Button>

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
