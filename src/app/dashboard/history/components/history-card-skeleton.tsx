import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const HistoryCardSkeleton = () => {
  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once overflow-hidden border-none bg-gradient-to-br shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <Skeleton className="h-4 w-32" />
        <div className="bg-card text-card rounded-full p-2">
          <Skeleton className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-6 w-25" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  )
}
