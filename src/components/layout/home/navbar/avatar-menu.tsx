import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import { me } from '@/http/kubb-gen'

import { LogoutButton } from './logout-button'

export const AvatarMenu = async () => {
  const { avatar, name, email } = await me()

  return (
    <div className="space-y-3 px-3">
      <Separator />
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatar || '/assets/default-user-avatar.webp'} className="object-cover object-center" />
          <AvatarFallback>WT</AvatarFallback>
        </Avatar>
        <div>
          <span className="text-foreground line-clamp-1 text-sm font-medium">{name}</span>
          <span className="line-clamp-1 text-xs font-medium text-gray-500">{email}</span>
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}

export const AvatarMenuSkeleton = () => {
  return (
    <div className="space-y-3 px-3">
      <Separator />
      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-22" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}
