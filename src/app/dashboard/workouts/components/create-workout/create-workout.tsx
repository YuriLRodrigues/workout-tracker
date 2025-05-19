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

import { CreateWorkoutForm } from './form'

export const CreateWorkout = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="hidden sm:flex"
            effect="shine"
            icon={<Icon name="Flame" className="text-red-700" />}
            iconPlacement="left"
          >
            Criar treino
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Crie o seu treino personalizado aqui</DialogTitle>
            <DialogDescription>Informe os dados do seu treino a ser criado.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-screen w-full pr-3">
            <CreateWorkoutForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="flex items-center gap-2 sm:hidden"
            effect="shine"
            icon={<Icon name="Flame" className="text-red-700" />}
            iconPlacement="left"
          >
            Criar treino
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Crie o seu treino personalizado aqui</DrawerTitle>
            <DrawerDescription>Informe os dados do seu treino a ser criado.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">
                <CreateWorkoutForm />
              </ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const CreateWorkoutSkeleton = () => {
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
