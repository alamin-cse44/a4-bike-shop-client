import { Button, Container, Typography } from "@mui/material"


function App() {

  return (
    <Container >
      <Typography sx={{color: "secondary"}} variant="h4" gutterBottom>
        Welcome to Your MUI Project!
      </Typography>
      <Button variant="contained" color="primary">
        Material UI Button
      </Button>
    </Container>
  )
}

export default App
