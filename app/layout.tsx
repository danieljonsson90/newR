import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { EnvVarWarning } from '@/components/env-var-warning';
import { AuthButton } from '@/components/auth-button';
import { hasEnvVars } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/theme-switcher';
const defaultUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_AZURE_DOMAIN_ADDRESS}`
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
          <header className="w-full">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
              </div>
            </nav>
          </header>
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              {children}
            </div>
          </main>
          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
            <ThemeSwitcher />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
