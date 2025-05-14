import { ReactNode } from 'react'

import { Icon } from '@/components/ui/icon'

import { ExecutionType, MuscleType } from '@/@types/exercise'
import { UserGender } from '@/@types/user'

export const mappingIcons = {
  BicepsFlexed: {
    genericName: 'Biceps',
    icon: <Icon name="BicepsFlexed" className="h-6 w-6" />,
    iconName: 'BicepsFlexed',
  },
  HeartPulse: {
    genericName: 'Coração pulsando',
    icon: <Icon name="HeartPulse" className="h-6 w-6" />,
    iconName: 'HeartPulse',
  },
  Goal: {
    genericName: 'Foco',
    icon: <Icon name="Goal" className="h-6 w-6" />,
    iconName: 'Goal',
  },
  Award: {
    genericName: 'Medalha',
    icon: <Icon name="Award" className="h-6 w-6" />,
    iconName: 'Award',
  },
  Trophy: {
    genericName: 'Troféu',
    icon: <Icon name="Trophy" className="h-6 w-6" />,
    iconName: 'Trophy',
  },
  Flame: {
    genericName: 'Fogo',
    icon: <Icon name="Flame" className="h-6 w-6" />,
    iconName: 'Flame',
  },
  Dumbbell: {
    genericName: 'Halter',
    icon: <Icon name="Dumbbell" className="h-6 w-6" />,
    iconName: 'Dumbbell',
  },
  Stopwatch: {
    genericName: 'Tempo',
    icon: <Icon name="Timer" className="h-6 w-6" />,
    iconName: 'Timer',
  },
  Bolt: {
    genericName: 'Explosão',
    icon: <Icon name="Bolt" className="h-6 w-6" />,
    iconName: 'Bolt',
  },
  Weight: {
    genericName: 'Peso',
    icon: <Icon name="Weight" className="h-6 w-6" />,
    iconName: 'Weight',
  },
  Activity: {
    genericName: 'Atividade',
    icon: <Icon name="Activity" className="h-6 w-6" />,
    iconName: 'Activity',
  },
  BarChart: {
    genericName: 'Progresso',
    icon: <Icon name="ChartBar" className="h-6 w-6" />,
    iconName: 'ChartBar',
  },
  Clock: {
    genericName: 'Tempo de treino',
    icon: <Icon name="Clock" className="h-6 w-6" />,
    iconName: 'Clock',
  },
  Droplets: {
    genericName: 'Hidratação',
    icon: <Icon name="Droplets" className="h-6 w-6" />,
    iconName: 'Droplets',
  },
  Footprints: {
    genericName: 'Cardio',
    icon: <Icon name="Footprints" className="h-6 w-6" />,
    iconName: 'Footprints',
  },
  Heart: {
    genericName: 'Saúde cardiovascular',
    icon: <Icon name="Heart" className="h-6 w-6" />,
    iconName: 'Heart',
  },
  Ruler: {
    genericName: 'Medidas',
    icon: <Icon name="Ruler" className="h-6 w-6" />,
    iconName: 'Ruler',
  },
  Scale: {
    genericName: 'Peso corporal',
    icon: <Icon name="Scale" className="h-6 w-6" />,
    iconName: 'Scale',
  },
  Utensils: {
    genericName: 'Nutrição',
    icon: <Icon name="Utensils" className="h-6 w-6" />,
    iconName: 'Utensils',
  },
  Brain: {
    genericName: 'Foco mental',
    icon: <Icon name="Brain" className="h-6 w-6" />,
    iconName: 'Brain',
  },
  Zap: {
    genericName: 'Energia',
    icon: <Icon name="Zap" className="h-6 w-6" />,
    iconName: 'Zap',
  },
  Repeat: {
    genericName: 'Repetições',
    icon: <Icon name="Repeat" className="h-6 w-6" />,
    iconName: 'Repeat',
  },
  Calendar: {
    genericName: 'Planejamento',
    icon: <Icon name="Calendar" className="h-6 w-6" />,
    iconName: 'Calendar',
  },
  ClipboardList: {
    genericName: 'Plano de treino',
    icon: <Icon name="ClipboardList" className="h-6 w-6" />,
    iconName: 'ClipboardList',
  },
  Hourglass: {
    genericName: 'Intervalo',
    icon: <Icon name="Hourglass" className="h-6 w-6" />,
    iconName: 'Hourglass',
  },
  Stretching: {
    genericName: 'Alongamento',
    icon: <Icon name="StretchHorizontal" className="h-6 w-6" />,
    iconName: 'StretchHorizontal',
  },
  Gauge: {
    genericName: 'Intensidade',
    icon: <Icon name="Gauge" className="h-6 w-6" />,
    iconName: 'Gauge',
  },
  Pill: {
    genericName: 'Suplementação',
    icon: <Icon name="Pill" className="h-6 w-6" />,
    iconName: 'Pill',
  },
  Waves: {
    genericName: 'Resistência',
    icon: <Icon name="Waves" className="h-6 w-6" />,
    iconName: 'Waves',
  },
  Lightbulb: {
    genericName: 'Técnica',
    icon: <Icon name="Lightbulb" className="h-6 w-6" />,
    iconName: 'Lightbulb',
  },
}

export const mappingColors = {
  Red: {
    genericName: 'Vermelho',
    colorCircle: <div className="h-4 w-4 rounded-full bg-red-500" />,
    colorName: 'text-red-500',
  },
  Green: {
    genericName: 'Verde',
    colorCircle: <div className="h-4 w-4 rounded-full bg-green-500" />,
    colorName: 'text-green-500',
  },
  Silver: {
    genericName: 'Prata',
    colorCircle: <div className="h-4 w-4 rounded-full bg-zinc-300" />,
    colorName: 'text-zinc-300',
  },
  Blue: {
    genericName: 'Azul',
    colorCircle: <div className="h-4 w-4 rounded-full bg-blue-500" />,
    colorName: 'text-blue-500',
  },
  Gray: {
    genericName: 'Cinza',
    colorCircle: <div className="h-4 w-4 rounded-full bg-gray-500" />,
    colorName: 'text-gray-500',
  },
  Yellow: {
    genericName: 'Amarelo',
    colorCircle: <div className="h-4 w-4 rounded-full bg-yellow-400" />,
    colorName: 'text-yellow-400',
  },
  Orange: {
    genericName: 'Laranja',
    colorCircle: <div className="h-4 w-4 rounded-full bg-orange-500" />,
    colorName: 'text-orange-500',
  },
  Pink: {
    genericName: 'Rosa',
    colorCircle: <div className="h-4 w-4 rounded-full bg-pink-400" />,
    colorName: 'text-pink-400',
  },
  Purple: {
    genericName: 'Roxo',
    colorCircle: <div className="h-4 w-4 rounded-full bg-purple-500" />,
    colorName: 'text-purple-500',
  },
  Brown: {
    genericName: 'Marrom',
    colorCircle: <div className="h-4 w-4 rounded-full bg-amber-900" />,
    colorName: 'text-amber-900',
  },
  Teal: {
    genericName: 'Verde-azulado',
    colorCircle: <div className="h-4 w-4 rounded-full bg-teal-500" />,
    colorName: 'text-teal-500',
  },
  Indigo: {
    genericName: 'Índigo',
    colorCircle: <div className="h-4 w-4 rounded-full bg-indigo-500" />,
    colorName: 'text-indigo-500',
  },
  Lime: {
    genericName: 'Limão',
    colorCircle: <div className="h-4 w-4 rounded-full bg-lime-500" />,
    colorName: 'text-lime-500',
  },
  Cyan: {
    genericName: 'Ciano',
    colorCircle: <div className="h-4 w-4 rounded-full bg-cyan-500" />,
    colorName: 'text-cyan-500',
  },
  Amber: {
    genericName: 'Âmbar',
    colorCircle: <div className="h-4 w-4 rounded-full bg-amber-500" />,
    colorName: 'text-amber-500',
  },
  Rose: {
    genericName: 'Rosa Claro',
    colorCircle: <div className="h-4 w-4 rounded-full bg-rose-500" />,
    colorName: 'text-rose-500',
  },
  Slate: {
    genericName: 'Slate',
    colorCircle: <div className="h-4 w-4 rounded-full bg-slate-500" />,
    colorName: 'text-slate-500',
  },
  Emerald: {
    genericName: 'Esmeralda',
    colorCircle: <div className="h-4 w-4 rounded-full bg-emerald-500" />,
    colorName: 'text-emerald-500',
  },
  Charcoal: {
    genericName: 'Carvão',
    colorCircle: <div className="h-4 w-4 rounded-full bg-gray-700" />,
    colorName: 'text-gray-700',
  },
}

export const mappingMuscleType: Record<MuscleType, ReactNode> = {
  [MuscleType.CHEST]: (
    <div className="flex items-center gap-2">
      <Icon name="Shield" className="h-5 w-5" />
      <span>Peitoral</span>
    </div>
  ),
  [MuscleType.BACK]: (
    <div className="flex items-center gap-2">
      <Icon name="Columns2" className="h-5 w-5" />
      <span>Costas</span>
    </div>
  ),
  [MuscleType.BICEPS]: (
    <div className="flex items-center gap-2">
      <Icon name="BicepsFlexed" className="h-5 w-5" />
      <span>Bíceps</span>
    </div>
  ),
  [MuscleType.TRICEPS]: (
    <div className="flex items-center gap-2">
      <Icon name="Hammer" className="h-5 w-5" />
      <span>Tríceps</span>
    </div>
  ),
  [MuscleType.SHOULDERS]: (
    <div className="flex items-center gap-2">
      <Icon name="Mountain" className="h-5 w-5" />
      <span>Ombros</span>
    </div>
  ),
  [MuscleType.LEGS]: (
    <div className="flex items-center gap-2">
      <Icon name="Footprints" className="h-5 w-5" />
      <span>Pernas</span>
    </div>
  ),
  [MuscleType.CALVES]: (
    <div className="flex items-center gap-2">
      <Icon name="Drumstick" className="h-5 w-5" />
      <span>Panturrilhas</span>
    </div>
  ),
  [MuscleType.ABS]: (
    <div className="flex items-center gap-2">
      <Icon name="Hexagon" className="h-5 w-5" />
      <span>Abdômen</span>
    </div>
  ),
  [MuscleType.FULL_BODY]: (
    <div className="flex items-center gap-2">
      <Icon name="PersonStanding" className="h-5 w-5" />
      <span>Corpo inteiro</span>
    </div>
  ),
}

export const mappingExecutionType: Record<ExecutionType, ReactNode> = {
  [ExecutionType.REPETITION]: (
    <div className="flex items-center gap-2">
      <Icon name="Repeat" className="h-5 w-5" />
      <span>Repetição</span>
    </div>
  ),
  [ExecutionType.TIME]: (
    <div className="flex items-center gap-2">
      <Icon name="Clock" className="h-5 w-5" />
      <span>Tempo</span>
    </div>
  ),
}

export const mappingGender: Record<UserGender, string> = {
  FEMALE: 'Feminino',
  MALE: 'Masculino',
  NON_BINARY: 'Não binário',
  OTHER: 'Outro',
  PREFER_NOT_TO_SAY: 'Prefiro não dizer',
  TRANSGENDER: 'Transgênero',
}
