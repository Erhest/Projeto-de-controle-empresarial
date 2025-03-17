'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, Typography, Card, CardContent, Button, Stack } from '@mui/material'

export default function ListaProfissionais() {
  const [profissionais, setProfissionais] = useState([])

  useEffect(() => {
    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    setProfissionais(storedProfissionais)
  }, [])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Profissionais Cadastrados
      </Typography>

      <Stack spacing={2}>
        {profissionais.length > 0 ? (
          profissionais.map((profissional, index) => (
            <Card key={index} sx={{ backgroundColor: 'background.paper', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {profissional.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Especialidade: {profissional.especialidade}
                </Typography>
                <Button variant="outlined" color="primary" component={Link} href={`/profissional/${index}`}>
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="text.secondary" align="center">
            Nenhum profissional cadastrado.
          </Typography>
        )}
      </Stack>
    </Container>
  )
}
