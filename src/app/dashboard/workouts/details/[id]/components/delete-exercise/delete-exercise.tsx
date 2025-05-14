'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { toast } from 'sonner'

import { deleteExerciseActions } from './delete-exercise.actions'

type DeleteExerciseButtonProps = {
  id: string
}

export const DeleteExerciseButton = ({ id }: DeleteExerciseButtonProps) => {
  const handleDeleteExercise = async () => {
    const { success, error } = await deleteExerciseActions({ id })

    if (success) {
      toast.success('Exercício deletado com sucesso do treino!')
      return
    }

    switch (error) {
      case 'Not allowed':
        toast.error('Você não tem permissão para realizar esta ação')
        break
      case 'Resource not found':
        toast.error('Exercício ou treino não encontrado')
        break
      default:
        toast.error('Erro ao tentar deletar este exercício')
    }
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      className="hover:bg-destructive/10 hover:text-destructive size-10 transition-colors"
      onClick={handleDeleteExercise}
    >
      <Icon name="Trash" className="h-4 w-4" />
    </Button>
  )
}
