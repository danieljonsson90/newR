// app/(protected)/layout.tsx
import { AuthButton } from '@/components/auth-button';
import { createClient } from '@/lib/supabase/client';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect('/auth/login');
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
