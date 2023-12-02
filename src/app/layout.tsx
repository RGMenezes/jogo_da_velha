import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <title>Jogo da Velha</title>
      <body>{children}</body>
    </html>
  )
}
