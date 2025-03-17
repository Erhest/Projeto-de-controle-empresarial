'use client'
import { ThemeProvider, CssBaseline, Container } from '@mui/material'
import theme from './theme'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Aplica o reset de estilos */}
          <Container maxWidth="md">{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  )
}