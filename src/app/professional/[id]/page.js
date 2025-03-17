'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Container, Typography, Card, CardContent, Stack } from '@mui/material'

export default function DetalhesProfissional() {
  const { id } = useParams()
  const [profissional, setProfissional] = useState(null)

  useEffect(() => {
    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    setProfissional(storedProfissionais[id])
  }, [id])

  if (!profissional) return <Typography color="text.secondary" align="center">Profissional não encontrado.</Typography>

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        {profissional.nome}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        Especialidade: {profissional.especialidade}
      </Typography>

      <Typography variant="h5" mt={4} color="secondary">
        Horas Trabalhadas
      </Typography>
      <Stack spacing={2}>
        <Card sx={{ backgroundColor: 'background.paper', boxShadow: 2 }}>
          <CardContent>
            <Typography variant="body1" color="text.primary">
              Horas trabalhadas: {profissional.horas || 0}h
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}
