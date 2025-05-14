import { UserRoles } from '@/@types/user'
import { icons } from 'lucide-react'

export type NavbarLinksProps = {
  iconName: keyof typeof icons
  href: string
  label: string
  highlight?: boolean
  isAuthOnly?: boolean
  permissionRoles?: UserRoles[]
}

export const navbarLinks: NavbarLinksProps[] = [
  {
    href: '#resources',
    label: 'Recursos',
    iconName: 'Feather',
  },
  // {
  //   href: '#plans',
  //   label: 'Planos',
  //   iconName: 'NotepadText',
  // },
  {
    href: '#testimonials',
    label: 'Depoimentos',
    iconName: 'AudioLines',
  },
  {
    href: '#faq',
    label: 'FAQ',
    iconName: 'MessageCircleDashed',
  },
  {
    href: '/auth/sign-in',
    label: 'Acessar',
    isAuthOnly: true,
    highlight: true,
    iconName: 'LogIn',
  },
]

export const profileLinks: NavbarLinksProps[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    iconName: 'LayoutDashboard',
    permissionRoles: [UserRoles.MANAGER, UserRoles.USER, UserRoles.PERSONAL],
  },
  {
    href: '/dashboard/workouts',
    label: 'Treinos',
    iconName: 'Goal',
    permissionRoles: [UserRoles.MANAGER, UserRoles.USER, UserRoles.PERSONAL],
  },
  {
    href: '/dashboard/history',
    label: 'Histórico',
    iconName: 'History',
    permissionRoles: [UserRoles.MANAGER, UserRoles.USER, UserRoles.PERSONAL],
  },
  {
    href: '/dashboard/settings/profile',
    label: 'Perfil',
    iconName: 'ShieldUser',
    permissionRoles: [UserRoles.MANAGER, UserRoles.USER, UserRoles.PERSONAL],
  },
]
