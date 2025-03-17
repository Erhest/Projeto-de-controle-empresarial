'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Typography, TextField, Button, Stack } from '@mui/material'

export default function CadastroProjeto() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const projetos = JSON.parse(localStorage.getItem('projetos')) || []
    projetos.push({ nome, descricao, profissionais: [] })
    localStorage.setItem('projetos', JSON.stringify(projetos))
    router.push('/projetos')
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Cadastrar Projeto
      </Typography>

      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField label="Nome do Projeto" fullWidth required value={nome} onChange={(e) => setNome(e.target.value)} />
        <TextField label="Descrição" fullWidth required value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Stack>
    </Container>
  )
}
