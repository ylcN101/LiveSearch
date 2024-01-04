'use client'
import LiveSearch from '../components/LiveSearch'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function Home() {
  const queryClient = new QueryClient()
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <QueryClientProvider client={queryClient}>
        <LiveSearch />
      </QueryClientProvider>
    </main>
  )
}
