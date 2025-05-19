import { ComponentProps, ReactNode } from 'react'

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

type UpdateExerciseProps = ComponentProps<'div'> & {
  children: ReactNode
}

export const UpdateExercise = ({ children }: UpdateExerciseProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="hidden sm:flex"
            effect="shine"
            size="icon"
            icon={<Icon name="Pencil" />}
            iconPlacement="left"
          />
        </DialogTrigger>
        <DialogContent className="lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edite o seu exercício personalizado aqui</DialogTitle>
            <DialogDescription>Altere as informações do exercício associando-o a este treino.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-screen w-full pr-3">{children}</ScrollArea>
        </DialogContent>
      </Dialog>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="flex items-center gap-2 sm:hidden"
            effect="shine"
            size="icon"
            icon={<Icon name="Pencil" />}
            iconPlacement="left"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edite o seu exercício personalizado aqui</DrawerTitle>
            <DrawerDescription>Altere as informações do exercício associando-o a este treino.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(50vh)] w-full pr-3">{children}</ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const UpdateExerciseSkeleton = () => {
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
