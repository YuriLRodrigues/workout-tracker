'use client'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { toast } from 'sonner'

import { deleteWorkoutActions } from './delete-workout.actions'

type DeleteWorkoutProps = {
  id: string
}

export const DeleteWorkout = ({ id }: DeleteWorkoutProps) => {
  const handleDeleteWorkout = async () => {
    const { success, error } = await deleteWorkoutActions({ id })

    if (success) {
      toast.success('Treino excluído com sucesso!')
      return
    }

    switch (error) {
      case 'Not allowed':
        toast.error('Você não tem autorização para excluir um treino')
        break
      case 'Resource not found':
        toast.error('Treino não encontrado')
        break
      default:
        toast.error('Erro ao excluir o treino')
        break
    }
    return
  }

  const handleConfirmDeleteWorkout = () => {
    toast.warning('Deseja realmente deletar este treino?', {
      action: {
        label: 'Confirmar',
        onClick: handleDeleteWorkout,
      },
    })
  }

  return (
    <Button
      onClick={handleConfirmDeleteWorkout}
      variant="destructive"
      size="icon"
      className="hover:bg-destructive/10 text-destructive size-10 transition-colors"
    >
      <Icon name="Trash" className="size-4" />
    </Button>
  )
}

export const DeleteWorkoutSkeleton = () => {
  return (
    <Button
      variant="destructive"
      size="icon"
      className="hover:bg-destructive/10 text-destructive size-10 transition-colors"
    >
      <Icon name="Trash" className="size-4" />
    </Button>
  )
}
