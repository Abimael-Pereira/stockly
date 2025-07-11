import type { Metadata } from 'next';
import './globals.css';
import Sidebar from './_components/sidebar';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'auto',
});

export const metadata: Metadata = {
  title: 'Stockly App',
  description: 'Um aplicativo para gerenciar suas vendas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
