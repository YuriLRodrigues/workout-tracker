import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { UserGender } from '@/@types/user'
import { useToggle } from '@/hooks/use-toggle'
import { useMe } from '@/http/kubb-gen'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { UpdatePersonalInfoSchemaType, updatePersonalInfoSchema } from './schema'
import { updatePersonalInfoActions } from './update-personal-info.actions'

export const useUpdatePersonalInfoForm = () => {
  const { toggle } = useToggle()
  const { data, isLoading } = useMe()
  const [requestIsSending, setRequestIsSending] = useState<boolean>(false)

  const form = useForm<UpdatePersonalInfoSchemaType>({
    resolver: zodResolver(updatePersonalInfoSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: data?.name || undefined,
      birthDate: data?.birthDate ? new Date(data?.birthDate) : undefined,
      gender: data?.birthDate ? (data?.gender as UserGender) : undefined,
      lastName: data?.lastName || undefined,
      phone: data?.phone || undefined,
    },
  })

  useEffect(() => {
    if (data?.name) {
      form.setValue('name', data.name)
    }
    if (data?.birthDate) {
      form.setValue('birthDate', new Date(data.birthDate))
    }
    if (data?.lastName) {
      form.setValue('lastName', data.lastName)
    }
    if (data?.phone) {
      form.setValue('phone', data.phone)
    }
    if (data?.gender) {
      form.setValue('gender', UserGender[data.gender])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data])

  const onSubmit = async (data: UpdatePersonalInfoSchemaType) => {
    setRequestIsSending(true)
    const { birthDate, gender, lastName, name, phone } = data

    const { success, error } = await updatePersonalInfoActions({
      birthDate,
      gender,
      lastName,
      name,
      phone,
    })

    if (success) {
      toast.success('Informações pessoais atualizadas!')
      toggle(false)
      setRequestIsSending(false)
      return
    }

    switch (error) {
      case 'Resource not found':
        toast.error('Usuário não encontrado!')
        break
      default:
        toast.error('Erro ao atualizar informações pessoais')
        break
    }
    setRequestIsSending(false)
    return
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading,
    requestIsSending,
  }
}
