'use client'
import { useState } from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

type InputPasswordProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
  placeholder?: string
}

export const InputPassword = <T extends FieldValues>(props: InputPasswordProps<T>) => {
  const { field, placeholder } = props

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} {...field} placeholder={placeholder} className="pr-6" />
      <span onClick={togglePasswordVisibility} className="absolute top-0 right-3 translate-y-1/2 cursor-pointer">
        {showPassword ? <Icon name="EyeOff" className="size-5" /> : <Icon name="Eye" className="size-5" />}
      </span>
    </div>
  )
}
