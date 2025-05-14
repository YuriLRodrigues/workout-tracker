import { CheckCircle } from 'lucide-react'

const features = [
  'Acompanhe seu progresso de treino',
  'Acesse treinamento personalizados',
  'Agende aulas e sessões',
  'Monitore seus objetivos de condicionamento físico',
  'Crie mais de 2 treinos (Plano Premium)',
  'Tenha um personal trainer para desenvolver seus treinos e monitorar seu histórico (Plano Premium)',
]

export default function AuthFeatures() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Assinatura Workout Tracker</h2>
      <p className="text-sm">
        Junte-se à nossa comunidade e transforme sua jornada fitness com nossos recursos premium.
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
