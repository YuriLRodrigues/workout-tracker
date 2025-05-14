import { UserRoles } from '@/@types/user'
import { icons } from 'lucide-react'

type DashboardLinksProps = {
  href?: string
  label: string
  iconName: keyof typeof icons
  permissionRoles: UserRoles[]
  group: 'Application' | 'Settings' | 'Plans' | 'Students'
  items?: Array<{
    label: string
    href: string
    iconName: keyof typeof icons
    permissionRoles: UserRoles[]
  }>
}

export const mainLinks: DashboardLinksProps[] = [
  {
    href: '/',
    label: 'Página incial',
    iconName: 'House',
    permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
    group: 'Application',
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    iconName: 'LayoutDashboard',
    permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
    group: 'Application',
    items: [
      {
        href: '/dashboard',
        label: 'Painel',
        iconName: 'ChartNoAxesColumn',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
      {
        href: '/dashboard/workouts',
        label: 'Treinos',
        iconName: 'BicepsFlexed',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
      // {
      //   href: '/dashboard/stats',
      //   label: 'Estatísticas',
      //   iconName: 'Activity',
      //   permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      // },
      {
        href: '/dashboard/history',
        label: 'Histórico',
        iconName: 'History',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
    ],
  },
  // {
  //   href: '/dashboard/help',
  //   label: 'Ajuda',
  //   iconName: 'MessageCircleQuestion',
  //   permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
  //   group: 'Application',
  // },
]

export const settingsLinks: DashboardLinksProps[] = [
  {
    label: 'Configurações',
    href: '/dashboard/settings',
    iconName: 'Settings',
    permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
    group: 'Settings',
    items: [
      {
        label: 'Perfil',
        href: '/dashboard/settings/profile',
        iconName: 'User',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
      // {
      //   label: 'Notificações',
      //   href: '/dashboard/settings/notifications',
      //   iconName: 'Bell',
      //   permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      // },
      {
        label: 'Tema',
        href: '/dashboard/settings/notifications',
        iconName: 'SunMoon',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
    ],
  },
]

export const plansLinks: DashboardLinksProps[] = [
  {
    label: 'Planos',
    iconName: 'CircleDollarSign',
    permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
    group: 'Settings',
    items: [
      {
        label: 'Grátis',
        href: '/dashboard/plans/free',
        iconName: 'BanknoteX',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
      {
        label: 'Premium',
        href: '/dashboard/plans/premium',
        iconName: 'Coins',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
      {
        label: 'Personal',
        href: '/dashboard/plans/personal',
        iconName: 'UsersRound',
        permissionRoles: [UserRoles.MANAGER, UserRoles.PERSONAL, UserRoles.USER],
      },
    ],
  },
]

export const dashboardProfileLinks: DashboardLinksProps[] = [
  {
    href: '/dashboard/settings/profile',
    label: 'Perfil',
    iconName: 'User',
    permissionRoles: [UserRoles.MANAGER, UserRoles.USER, UserRoles.PERSONAL],
    group: 'Settings',
  },
]
