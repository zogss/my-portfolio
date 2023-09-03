import type { HeadFC, PageProps } from 'gatsby'
import * as React from 'react'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-zinc-900 text-gray-200">
      Hello world!
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
