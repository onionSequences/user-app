import type { Metadata } from 'next';
import 'styles/globals.scss';

export const metadata: Metadata = {
  title: 'Family Circle',
  description: 'Private family directory with birthday reminders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
