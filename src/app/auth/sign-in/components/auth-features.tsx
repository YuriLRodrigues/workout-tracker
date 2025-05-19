import { CheckCircle } from 'lucide-react'

const features = [
  'Crie treinos personalizados',
  'Acompanhe seu progresso de treino',
  'Monitore seus registros de treinos',
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
