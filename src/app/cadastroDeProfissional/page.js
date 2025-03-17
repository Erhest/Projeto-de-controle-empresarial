'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Typography, TextField, Button, Stack } from '@mui/material'

export default function CadastroProfissional() {
  const [nome, setNome] = useState('')
  const [especialidade, setEspecialidade] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const profissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    profissionais.push({ nome, especialidade })
    localStorage.setItem('profissionais', JSON.stringify(profissionais))
    router.push('/profissional')
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Cadastrar Profissional
      </Typography>

      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField label="Nome" fullWidth required value={nome} onChange={(e) => setNome(e.target.value)} />
        <TextField label="Especialidade" fullWidth required value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Stack>
    </Container>
  )
}
