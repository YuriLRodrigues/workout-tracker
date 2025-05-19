import { ReactNode } from 'react'

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

export const EditWorkout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="hidden sm:flex"
            effect="ringHover"
            size="icon"
            icon={<Icon name="Pencil" />}
            iconPlacement="left"
          />
        </DialogTrigger>
        <DialogContent className="lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edite o seu treino personalizado aqui</DialogTitle>
            <DialogDescription>Informe os dados que serão modificados do seu treino.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-screen w-full pr-3">{children}</ScrollArea>
        </DialogContent>
      </Dialog>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="flex items-center gap-2 sm:hidden"
            effect="ringHover"
            size="icon"
            icon={<Icon name="Pencil" />}
            iconPlacement="left"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Crie o seu treino personalizado aqui</DrawerTitle>
            <DrawerDescription>
              Informe os dados do seu treino e selecione os exercícios que deseja incluir.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">{children}</ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const EditWorkoutSkeleton = () => {
  return (
    <>
      <Button
        className="hidden md:flex"
        effect="ringHover"
        size="icon"
        disabled
        icon={<Icon name="Pencil" />}
        iconPlacement="left"
      />

      <Button
        className="flex items-center gap-2 sm:hidden"
        effect="ringHover"
        size="icon"
        disabled
        icon={<Icon name="Pencil" />}
        iconPlacement="left"
      />
    </>
  )
}
