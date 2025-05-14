'use client'

import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchInterval: false,
      retry: 2,
      staleTime: Infinity,
      retryOnMount: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

export const TanStackProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
