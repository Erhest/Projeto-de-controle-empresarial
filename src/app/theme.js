import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffcc00', 
      contrastText: '#000000', 
    },
    secondary: {
      main: '#00e676', 
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
})

export default theme
