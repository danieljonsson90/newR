import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const headersList = await headers();

  // For dynamic routes
  // const fullUrl = headersList.get('x-url') || '';
  // const path = new URL(fullUrl).pathname;
  // const supabase = createClient();
  // const { data } = await supabase.auth.getUser();
  // if (!data.user) {
  //   redirect('auth/login');
  // }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
