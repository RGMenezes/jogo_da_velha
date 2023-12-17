'use client'
import store from '@/redux/store';
import './globals.css';
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux';
import SystemTool from '@/components/layout/SystemTool';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <title>Jogo da Velha</title>
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <Provider store={store}>
            <SystemTool>
              {children}
            </SystemTool>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
