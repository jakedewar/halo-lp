import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import ScrollToTop from './components/ScrollToTop'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Halo - Your Digital Memory Layer',
  description: 'Halo captures your thoughts, actions, and ideas as you move across the web — so you can remember and act, effortlessly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
