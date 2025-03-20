'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Container, Typography, Button } from '@mui/material'

export default function ProfissionalDetalhes() {
  const { id } = useParams()
  const router = useRouter()
  const [profissional, setProfissional] = useState(null)
  const [trabalhando, setTrabalhando] = useState(false)
  const [horasTrabalhadas, setHorasTrabalhadas] = useState(0)
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    setProfissional(storedProfissionais[id])

    if (storedProfissionais[id]?.horasTrabalhadas) {
      setHorasTrabalhadas(storedProfissionais[id].horasTrabalhadas)
    }
  }, [id])

  const togglePonto = () => {
    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []

    if (trabalhando) {
      // Parar contagem
      const tempoDecorrido = (Date.now() - startTime) / 3600000 // Converte ms para horas
      const totalHoras = horasTrabalhadas + tempoDecorrido
      setHorasTrabalhadas(totalHoras)
      storedProfissionais[id].horasTrabalhadas = totalHoras
      setTrabalhando(false)
      setStartTime(null)
    } else {
      // Iniciar contagem
      setStartTime(Date.now())
      setTrabalhando(true)
    }

    localStorage.setItem('profissionais', JSON.stringify(storedProfissionais))
  }

  if (!profissional) return <Typography align="center">Profissional não encontrado</Typography>

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        {profissional.nome}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        Especialidade: {profissional.especialidade}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
        Horas Trabalhadas: {horasTrabalhadas.toFixed(2)}
      </Typography>

      <Button
        variant="contained"
        color={trabalhando ? 'error' : 'success'}
        fullWidth
        sx={{ mt: 2 }}
        onClick={togglePonto}
      >
        {trabalhando ? 'Parar Ponto' : 'Iniciar Ponto'}
      </Button>

      <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => router.push('/')}>
        Voltar para a Página Principal
      </Button>
    </Container>
  )
}
