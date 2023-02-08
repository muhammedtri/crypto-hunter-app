import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components"
import { HomePage, CoinPage } from "./pages"
import "./App.css"
import { makeStyles } from "tss-react/mui"

const App = () => {
  const useStyles = makeStyles()((theme) => {
    return {
      App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
      },
    }
  })

  const { classes } = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/coins/:id" exact element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
