'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, TextField, Button, MenuItem, Typography } from '@mui/material'

export default function CadastroProfissional() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [especialidade, setEspecialidade] = useState('')
  const [projetos, setProjetos] = useState([])
  const [projetoSelecionado, setProjetoSelecionado] = useState('')

  useEffect(() => {
    const storedProjetos = JSON.parse(localStorage.getItem('projetos')) || []
    setProjetos(storedProjetos)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const novoProfissional = { nome, especialidade, projeto: projetoSelecionado }

    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    storedProfissionais.push(novoProfissional)
    localStorage.setItem('profissionais', JSON.stringify(storedProfissionais))

    setNome('')
    setEspecialidade('')
    setProjetoSelecionado('')

    // Redireciona para a página principal
    router.push('/')
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Cadastrar Profissional
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Especialidade"
          fullWidth
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Projeto"
          fullWidth
          value={projetoSelecionado}
          onChange={(e) => setProjetoSelecionado(e.target.value)}
          required
          sx={{ mb: 2 }}
        >
          {projetos.length > 0 ? (
            projetos.map((projeto, index) => (
              <MenuItem key={index} value={projeto.nome}>
                {projeto.nome}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Nenhum projeto disponível</MenuItem>
          )}
        </TextField>

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