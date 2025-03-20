'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material'

export default function DetalhesProjeto() {
  const router = useRouter()
  const { id } = useParams()
  const [projeto, setProjeto] = useState(null)
  const [profissionais, setProfissionais] = useState([])

  useEffect(() => {
    const storedProjetos = JSON.parse(localStorage.getItem('projetos')) || []
    const foundProjeto = storedProjetos[id] || null
    setProjeto(foundProjeto)

    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    const profissionaisNoProjeto = storedProfissionais.filter((prof) => prof.projeto === foundProjeto?.nome)
    setProfissionais(profissionaisNoProjeto)
  }, [id])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {projeto ? (
        <>
          <Typography variant="h4" color="primary" gutterBottom>
            {projeto.nome}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {projeto.descricao}
          </Typography>

          <Typography variant="h6" color="secondary" gutterBottom>
            Profissionais Alocados:
          </Typography>

          <List>
            {profissionais.length > 0 ? (
              profissionais.map((profissional, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={profissional.nome}
                    secondary={`Horas Trabalhadas: ${profissional.horasTrabalhadas?.toFixed(2) || 0}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography align="center" sx={{ mt: 2 }}>
                Nenhum profissional alocado neste projeto.
              </Typography>
            )}
          </List>
        </>
      ) : (
        <Typography align="center">Projeto não encontrado.</Typography>
      )}

      <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => router.push('/projetos')}>
        Voltar para Lista de Projetos
      </Button>
    </Container>
  )
}