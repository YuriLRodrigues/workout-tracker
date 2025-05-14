'use client'

import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const CustomBreadCrumb = () => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  const shouldShowEllipsis = paths.length > 3
  const first = paths[0]
  const hidden = shouldShowEllipsis ? paths.slice(1, -2) : []
  const lastTwo = shouldShowEllipsis ? paths.slice(-2) : paths.slice(1)

  const generateHref = (index: number) => `/${paths.slice(0, index + 1).join('/')}`

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${first}`} className="line-clamp-1 first-letter:uppercase">
            {first}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {shouldShowEllipsis && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="shadow-none">
                  {hidden.map((item, idx) => {
                    const fullIndex = idx + 1
                    return (
                      <DropdownMenuItem key={item} asChild>
                        <a href={generateHref(fullIndex)}>
                          <span className="first-letter:uppercase">{item}</span>
                        </a>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {lastTwo.map((path, idx) => {
          const actualIndex = paths.length - lastTwo.length + idx
          const isLast = idx === lastTwo.length - 1
          return (
            <Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="line-clamp-1 first-letter:uppercase">{path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={generateHref(actualIndex)} className="line-clamp-1 first-letter:uppercase">
                    {path}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
