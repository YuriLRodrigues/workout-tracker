import { Suspense } from 'react'

import { ChangePassword } from './components/change-password'
import { PersonalInfo } from './components/info/personal-info'
import { PhysicsStats } from './components/info/physics-stats'
import { ProfileCard, ProfileCardSkeleton } from './components/profile-card'
import { Container } from '@/components/interface/container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ProfilePage() {
  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Perfil</Container.Title>
        <Container.Description>Gerencie suas informações pessoais e configurações</Container.Description>
      </Container.Header>
      <Tabs defaultValue="info" className="@container space-y-2">
        <TabsList className="w-full">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="grid gap-4 @sm:grid-cols-1 @min-4xl:grid-cols-2 @min-[90rem]:grid-cols-3">
          <Suspense fallback={<ProfileCardSkeleton />}>
            <ProfileCard />
          </Suspense>
          <PersonalInfo />
          <PhysicsStats />
        </TabsContent>
        <TabsContent value="seguranca" className="mt-6">
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </Container.Content>
  )
}
