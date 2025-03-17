import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Container, Typography, Card, CardContent, Button, Stack, TextField, MenuItem } from '@mui/material'

export default function DetalhesProjeto() {
  const { id } = useParams()
  const [projeto, setProjeto] = useState(null)
  const [profissionais, setProfissionais] = useState([])
  const [selectedProfissional, setSelectedProfissional] = useState('')
  const [horas, setHoras] = useState('')

  useEffect(() => {
    const storedProjetos = JSON.parse(localStorage.getItem('projetos')) || []
    setProjeto(storedProjetos[id])

    const storedProfissionais = JSON.parse(localStorage.getItem('profissionais')) || []
    setProfissionais(storedProfissionais)
  }, [id])

  const adicionarProfissional = () => {
    if (!selectedProfissional || !horas) return
    const updatedProjeto = { ...projeto, profissionais: [...(projeto.profissionais || []), { nome: selectedProfissional, horas }] }
    
    const storedProjetos = JSON.parse(localStorage.getItem('projetos'))
    storedProjetos[id] = updatedProjeto
    localStorage.setItem('projetos', JSON.stringify(storedProjetos))

    setProjeto(updatedProjeto)
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5">Adicionar Profissional</Typography>
      <Stack direction="row" spacing={2}>
        <TextField select label="Profissional" fullWidth value={selectedProfissional} onChange={(e) => setSelectedProfissional(e.target.value)}>
          {profissionais.map((p, i) => <MenuItem key={i} value={p.nome}>{p.nome}</MenuItem>)}
        </TextField>
        <TextField label="Horas" type="number" fullWidth value={horas} onChange={(e) => setHoras(e.target.value)} />
        <Button variant="contained" color="primary" onClick={adicionarProfissional}>Adicionar</Button>
      </Stack>
    </Container>
  )
}
