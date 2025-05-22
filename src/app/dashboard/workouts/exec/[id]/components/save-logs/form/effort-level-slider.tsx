'use client'

import { useState, useEffect } from 'react'

import { Label } from '@/components/ui/label'
import { RequiredFieldAsterisk } from '@/components/ui/required-field-asterisk'
import { Slider } from '@/components/ui/slider'

interface EffortLevelSliderProps {
  value: number
  onChange: (value: number) => void
}

export const EffortLevelSlider = ({ value, onChange }: EffortLevelSliderProps) => {
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [animationSize, setAnimationSize] = useState(1)

  // Atualiza a animação com base no nível de esforço
  useEffect(() => {
    setAnimationSpeed(value / 5) // Velocidade aumenta com o nível
    setAnimationSize(0.8 + value / 10) // Tamanho aumenta com o nível
  }, [value])

  const handleChange = (newValue: number[]) => {
    onChange(newValue[0])
  }

  // Determina a cor com base no nível de esforço
  const getEffortColor = () => {
    if (value <= 3) return 'bg-green-500'
    if (value <= 7) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // Determina o texto descritivo do nível de esforço
  const getEffortText = () => {
    if (value <= 2) return 'Leve'
    if (value <= 4) return 'Moderado'
    if (value <= 6) return 'Intenso'
    if (value <= 8) return 'Muito Intenso'
    return 'Máximo'
  }

  return (
    <div className="mb-3 space-y-1 @xs:col-span-2">
      <Label className="mb-3">
        Nível de esforço <RequiredFieldAsterisk />
      </Label>
      <div className="flex flex-wrap items-center justify-between gap-1">
        <Slider value={[value]} min={1} max={10} step={1} onValueChange={handleChange} className="w-full" />
        <span className="text-lg font-bold">{value}/10</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1">
        <span className="text-sm text-gray-500 dark:text-neutral-400">{getEffortText()}</span>
        <div className="flex items-center">
          {[...Array(Math.min(value, 5))].map((_, i) => (
            <div
              key={i}
              className={`${getEffortColor()} mx-0.5 animate-pulse rounded-full`}
              style={{
                width: `${9 * animationSize}px`,
                height: `${9 * animationSize}px`,
                animationDuration: `${2 / animationSpeed}s`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative pt-2">
        <div className="h-5 w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
          <div
            className={`h-full ${getEffortColor()} flex items-center justify-center transition-all duration-500`}
            style={{ width: `${value * 10}%` }}
          >
            {value >= 3 && <span className="truncate px-2 text-xs font-bold text-white">{getEffortText()}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
