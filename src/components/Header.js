import {
  AppBar,
  Button,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material"
import { Box, Container, ThemeProvider } from "@mui/system"
import { useNavigate } from "react-router-dom"
import { makeStyles } from "tss-react/mui"
import { CryptoState } from "../CryptoContext"
import LoginModel from "./LoginModel"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})
const useStyles = makeStyles()((theme) => {
  return {
    title: {
      cursor: "pointer",
    },
    button: {
      backgroundColor: "gold",
      color: "black",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
    },
  }
})
const Header = () => {
  const { currency, setCurrency } = CryptoState()
  const navigate = useNavigate()
  const { classes } = useStyles()
  return (
    <AppBar position="static" color="transparent">
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            className={classes.title}
            variant="h6"
            fontWeight={800}
            color="#FFD700"
            onClick={() => navigate("/")}
          >
            Crypto TRACKER
          </Typography>
          <Box style={{ display: "flex" }}>
            <ThemeProvider theme={darkTheme}>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  width: 100,
                  height: 40,
                  margin: "0 10px",
                }}
              >
                <MenuItem value={"usd"}>USD</MenuItem>
                <MenuItem value={"eur"}>EURO</MenuItem>
              </Select>
            </ThemeProvider>
            <LoginModel>
              <Button variant="contained" className={classes.button}>
                Login
              </Button>
            </LoginModel>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
