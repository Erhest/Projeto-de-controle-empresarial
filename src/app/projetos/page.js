'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, Typography, Card, CardContent, Button, Stack } from '@mui/material'

export default function ListaProjetos() {
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    const storedProjetos = JSON.parse(localStorage.getItem('projetos')) || []
    setProjetos(storedProjetos)
  }, [])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Projetos da Empresa
      </Typography>

      <Stack spacing={2}>
        {projetos.length > 0 ? (
          projetos.map((projeto, index) => (
            <Card key={index} sx={{ backgroundColor: 'background.paper', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {projeto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {projeto.descricao}
                </Typography>
                <Button variant="outlined" color="primary" component={Link} href={`/projetos/${index}`}>
                  Ver detalhes
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="text.secondary" align="center">
            Nenhum projeto cadastrado.
          </Typography>
        )}
      </Stack>
    </Container>
  )
}