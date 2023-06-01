import './globals.css'
import AppBar from "@/components/Nav/AppBar";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Open Insurance',
  description: 'Open sourced insurance submission for Ontario',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppBar />
      <div>
        {children}
      </div>
      </body>
    </html>
  )
}
