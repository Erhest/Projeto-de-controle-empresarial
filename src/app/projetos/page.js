'use client'
import { useState, useEffect } from 'react'
import { Container, Typography, Card, CardContent, Button } from '@mui/material'

export default function ListaProjetos() {
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    const storedProjetos = JSON.parse(localStorage.getItem('projetos')) || []
    setProjetos(storedProjetos)
  }, [])

  const excluirProjeto = (index) => {
    const novosProjetos = projetos.filter((_, i) => i !== index)
    setProjetos(novosProjetos)
    localStorage.setItem('projetos', JSON.stringify(novosProjetos))
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center">
        Projetos Cadastrados
      </Typography>

      {projetos.length > 0 ? (
        projetos.map((projeto, index) => (
          <Card key={index} sx={{ backgroundColor: 'background.paper', boxShadow: 2, mb: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.primary">
                {projeto.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descrição: {projeto.descricao}
              </Typography>

              <Button variant="contained" color="error" onClick={() => excluirProjeto(index)}>
                Excluir
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="text.secondary" align="center">
          Nenhum projeto cadastrado.
        </Typography>
      )}
    </Container>
  )
}