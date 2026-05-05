import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

// Season Serif VF Light — paid font (Pangram Pangram). Local file for evaluation only.
const seasonSerif = localFont({
  src: './fonts/season-serif-light.woff2',
  display: 'swap',
  variable: '--font-season-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  title: 'Trueplace — AI-native preparation.',
  description:
    'Trueplace builds AI interview platforms. Home of Soreno AI and Confetto AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${seasonSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
