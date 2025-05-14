import type { LucideIcon } from 'lucide-react'

interface AchievementCardProps {
  title: string
  date: string
  icon: LucideIcon
  color: string
}

export function AchievementCard({ title, date, icon: Icon, color }: AchievementCardProps) {
  return (
    <div className="bg-muted/50 hover:bg-muted/80 animate-fade-up animate-once flex items-center gap-4 rounded-lg p-3 transition-colors">
      <div className={`rounded-full p-2 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{date}</p>
      </div>
    </div>
  )
}
