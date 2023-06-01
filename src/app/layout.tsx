import AppBar from "@/components/Nav/AppBar";
import './globals.css'

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
      <body className={'min-h-screen min-w-full overflow-y-auto overflow-x-hidden flex flex-col gap-8'}>
      <AppBar/>
      <section className={'max-w-7xl w-full mx-auto bg-gray-700 p-8 rounded mb-8'}>
          {children}
      </section>
      </body>
    </html>
  )
}
