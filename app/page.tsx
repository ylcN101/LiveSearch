'use client'
import LiveSearch from '../components/LiveSearch'
import Nav from '../components/Nav'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function Home() {
  const queryClient = new QueryClient()
  return (
    <>
      <main className=" h-screen overflow-y-auto">
        <nav>
          <Nav />
        </nav>
        <main className="flex flex-col items-center justify-between p-12">
          <QueryClientProvider client={queryClient}>
            <LiveSearch />
          </QueryClientProvider>
        </main>
      </main>
    </>
  )
}
