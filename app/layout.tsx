import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'House Guestbook',
  description: 'Leave a memory from your visit'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amber-50 min-h-screen">{children}</body>
    </html>
  );
}
