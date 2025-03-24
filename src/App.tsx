import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { PDFGenerator } from './components/PDFGenerator';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <PDFGenerator />
      </Container>
    </ThemeProvider>
  );
}

export default App;
