import { NavBar } from '@/src/components/NavBar';
import { Toaster } from 'sonner';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <NavBar />
        <main className="min-h-screen pt-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
