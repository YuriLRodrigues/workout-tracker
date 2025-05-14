import { UploadUserAvatar } from '@/components/interface/upload/upload-user-avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { ImageType } from '@/@types/image'
import { me } from '@/http/kubb-gen'
import { formatDate } from '@/utils/format-date'
import { mappingGender } from '@/utils/mappings'

export const ProfileCard = async () => {
  const { email, name, avatar, blurHash, createdAt, gender, lastName } = await me({
    next: { tags: ['me'] },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center gap-3">
          <UploadUserAvatar
            initialAvatarUrl={avatar}
            blurHash={blurHash}
            tagToRevalidate="me"
            type={ImageType.AVATAR}
          />
          <div className="space-y-1 *:text-center">
            <CardTitle className="flex items-center justify-center gap-1 first-letter:uppercase">
              {name} {lastName}
            </CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Icon name="User" className="text-primary h-5 w-5" />
            </div>
            <span className="text-sm">Membro desde {formatDate(createdAt)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Icon name="CreditCard" className="text-primary h-5 w-5" />
            </div>
            <span className="text-sm">Plano Gratuito</span>
          </div>
          {gender && (
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-full p-2">
                <Icon name="VenusAndMars" className="text-primary h-5 w-5" />
              </div>
              <span className="text-sm">{mappingGender[gender]}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export const ProfileCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center gap-3">
          <div className="bg-primary/10 relative flex size-22 items-center justify-center rounded-full">
            <div className="text-neutral-800 dark:text-neutral-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12">
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className="bg-primary/10 hover:bg-primary/10 border-primary hover:border-primary/20 absolute -right-2 -bottom-2 z-10 cursor-pointer rounded-full border-2 border-dotted p-1.5 shadow-md transition-colors"
              aria-label="Upload avatar"
            >
              <Icon name="Camera" className="size-5" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Icon name="User" className="text-primary h-5 w-5" />
            </div>
            <div className="flex items-center gap-x-2 text-sm">
              Membro desde <Skeleton className="h-4 w-25" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Icon name="CreditCard" className="text-primary h-5 w-5" />
            </div>
            <div className="flex items-center gap-x-2 text-sm">
              Plano <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
