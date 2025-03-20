'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Typography, Button, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material'

export default function ListaProfissionais() {
  const router = useRouter()
  const [profissionais, setProfissionais] = useState([])
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    setProfissionais(JSON.parse(localStorage.getItem('profissionais')) || [])
    setProjetos(JSON.parse(localStorage.getItem('projetos')) || [])
  }, [])

  const togglePonto = (index) => {
    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    const profissional = storedProfissionais[index]

    if (profissional.trabalhando) {
      const tempoDecorrido = (Date.now() - profissional.startTime) / 3600000 // Converte ms para horas
      profissional.horasTrabalhadas += tempoDecorrido
      profissional.trabalhando = false
      profissional.startTime = null
    } else {
      profissional.trabalhando = true
      profissional.startTime = Date.now()
    }

    storedProfissionais[index] = profissional
    localStorage.setItem('profissionais', JSON.stringify(storedProfissionais))
    setProfissionais([...storedProfissionais])
  }

  const vincularProjeto = (index, projetoNome) => {
    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    storedProfissionais[index].projeto = projetoNome
    localStorage.setItem('profissionais', JSON.stringify(storedProfissionais))
    setProfissionais([...storedProfissionais])
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Lista de Profissionais
      </Typography>

      <List>
        {profissionais.length > 0 ? (
          profissionais.map((profissional, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText
                primary={`${profissional.nome} - ${profissional.projeto || 'Sem projeto'}`}
                secondary={`Especialidade: ${profissional.especialidade} | Horas Trabalhadas: ${profissional.horasTrabalhadas?.toFixed(2) || 0}`}
              />

              {profissional.trabalhando && profissional.startTime && (
                <Typography color="secondary" sx={{ fontSize: 12, mr: 2 }}>
                  Tempo atual: {((Date.now() - profissional.startTime) / 60000).toFixed(1)} min
                </Typography>
              )}

              <Select
                value={profissional.projeto || ''}
                onChange={(e) => vincularProjeto(index, e.target.value)}
                sx={{ mr: 2 }}
                displayEmpty
              >
                <MenuItem value="">Sem Projeto</MenuItem>
                {projetos.map((projeto, projIndex) => (
                  <MenuItem key={projIndex} value={projeto.nome}>
                    {projeto.nome}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                color={profissional.trabalhando ? 'error' : 'success'}
                onClick={() => togglePonto(index)}
              >
                {profissional.trabalhando ? 'Parar Ponto' : 'Iniciar Ponto'}
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography align="center" sx={{ mt: 2 }}>
            Nenhum profissional cadastrado.
          </Typography>
        )}
      </List>

      <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => router.push('/')}>
        Voltar para a Página Principal
      </Button>
    </Container>
  )
}