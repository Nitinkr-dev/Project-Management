import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProManage - Project Management System',
  description: 'Plan. Manage. Deliver.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
