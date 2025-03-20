'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, TextField, Button, Typography } from '@mui/material'

export default function CadastroProjeto() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const novoProjeto = { nome, descricao }

    const storedProjetos = JSON.parse(localStorage.getItem('projetos')) || []
    storedProjetos.push(novoProjeto)
    localStorage.setItem('projetos', JSON.stringify(storedProjetos))

    setNome('')
    setDescricao('')

    // Redirecionar para a página principal
    router.push('/')
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Cadastrar Projeto
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome do Projeto"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Descrição"
          fullWidth
          multiline
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Cadastrar
        </Button>

        <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => router.push('/')}>
          Voltar para a Página Principal
        </Button>
      </form>
    </Container>
  )
}