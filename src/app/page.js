'use client'
import Link from 'next/link'
import { Container, Typography, Card, CardContent, Button, Stack } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: 'background.paper', p: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom align="center">
            Controle de Horas por Projeto
          </Typography>
          <Typography variant="body1" color="secondary" gutterBottom align="center">
            Escolha uma das opções abaixo:
          </Typography>

          <Stack spacing={2} mt={2}>
            <Button variant="contained" color="primary" component={Link} href="/cadastroDeProfissional">
              Cadastrar Profissional
            </Button>
            <Button variant="contained" color="secondary" component={Link} href="/cadastroDeProjeto">
              Cadastrar Projeto
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}
              component={Link}
              href="/profissional"
            >
              Lista de Profissionais
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#d32f2f', color: '#fff', '&:hover': { backgroundColor: '#b71c1c' } }}
              component={Link}
              href="/projetos"
            >
              Lista de Projetos
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}