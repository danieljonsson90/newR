import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import '../globals.css';
import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import Link from 'next/link';
const defaultUrl =
  process.env.NODE_ENV === 'production'
    ? `https://testapp-fph9dpg4fzb9dhgd.swedencentral-01.azurewebsites.net`
    : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'UNQ Consulting',
  description: 'Handle under consulting assignments, consultants, and clients.',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="w-full border-b">
            <nav className="flex items-center space-x-6 p-4 ">
              <Link href={`/`}>Home</Link>
              <Link href={`/customers`}>Clients</Link>
              <Link href={`/partners`}>Partners</Link>
              <Link href={`/consultants`}>Consultants</Link>
              <Link href={`/assignments`}>Assignments</Link>
              <div className="w-full  flex justify-end items-center p-3 px-5 text-sm">
                <AuthButton />
              </div>
            </nav>
          </header>
          <main className="min-h-screen flex flex-col ">
            <div className="flex-1 flex flex-col gap-20 m-10">{children}</div>
          </main>
          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
            <ThemeSwitcher />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
