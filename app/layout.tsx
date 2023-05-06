import '../styles/globals.scss';

export const metadata = {
  title: 'Toy Robot App with Next.js',
  description: 'Adam\'s Pet project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
};
