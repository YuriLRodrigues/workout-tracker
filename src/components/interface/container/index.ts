import { AnimatedContainerContent } from './animated-container-content'
import { ContainerContent } from './container-content'
import { ContainerDescrition } from './container-description'
import { ContainerHeader } from './container-header'
import { ContainerRoot } from './container-root'
import { ContainerSeparator } from './container-separator'
import { ContainerTitle } from './container-title'

export const Container = {
  Root: ContainerRoot,
  Header: ContainerHeader,
  Title: ContainerTitle,
  Description: ContainerDescrition,
  Separator: ContainerSeparator,
  Animated: AnimatedContainerContent,
  Content: ContainerContent,
}
