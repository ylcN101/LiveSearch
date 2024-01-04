import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import LiveSearch from '../components/LiveSearch'

describe('LiveSearch', () => {
  it('renders the component with initial elements', () => {
    const client = new QueryClient()

    render(
      <QueryClientProvider client={client}>
        <LiveSearch />
      </QueryClientProvider>
    )
    expect(screen.getByPlaceholderText('Search for a country')).toBeInTheDocument()
    expect(screen.getByText('Sort by...')).toBeInTheDocument()
  })
})
