import { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Icon } from '@/components/ui/icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

import { CreateExerciseForm } from './form'

type CreateExerciseProps = ComponentProps<'div'>

export const CreateExercise = ({ className }: CreateExerciseProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn(
              'hover:border-primary hover:bg-primary/5 animate-fade-up animate-once hidden w-fit border-2 border-dashed transition-colors sm:flex',
              className,
            )}
            variant="outline"
            effect="shine"
            icon={<Icon name="Flame" className="text-red-700" />}
            iconPlacement="left"
          >
            Adicionar exercício
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Crie o seu exercício personalizado aqui</DialogTitle>
            <DialogDescription>Preencha as informações do exercício associando-o a este treino.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-screen w-full pr-3">
            <CreateExerciseForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn(
              'hover:border-primary hover:bg-primary/5 animate-fade-up animate-once flex w-fit items-center gap-2 border-2 border-dashed transition-colors sm:hidden',
              className,
            )}
            variant="outline"
            effect="shine"
            icon={<Icon name="Flame" className="text-red-700" />}
            iconPlacement="left"
          >
            Adicionar exercício
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Crie o seu exercício personalizado aqui</DrawerTitle>
            <DrawerDescription>Preencha as informações do exercício associando-o a este treino.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(50vh)] w-full pr-3">
                <CreateExerciseForm />
              </ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const CreateExerciseSkeleton = () => {
  return (
    <>
      <Button
        className="hidden md:flex"
        effect="shine"
        icon={<Icon name="Flame" className="text-red-700" />}
        iconPlacement="left"
      >
        <Skeleton className="size-full" />
      </Button>

      <Button
        className="flex items-center gap-2 sm:hidden"
        effect="shine"
        icon={<Icon name="Flame" className="text-red-700" />}
        iconPlacement="left"
      >
        <Skeleton className="size-full" />
      </Button>
    </>
  )
}
