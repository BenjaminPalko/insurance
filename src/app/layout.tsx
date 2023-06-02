import AppBar from "@/components/Nav/AppBar";
import Footer from "@/components/Nav/Footer";
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
    <body className={'min-h-screen min-w-full overflow-y-auto overflow-x-hidden flex flex-col gap-8 pb-8'}>
    <AppBar/>
    <section className={'flex-1 max-w-7xl w-full mx-auto bg-white dark:bg-gray-700 p-8 rounded'}>
      {children}
    </section>
    <Footer/>
    </body>
    </html>
  )
}
