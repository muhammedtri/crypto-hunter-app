import {
  Box,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { Container, styled, ThemeProvider } from "@mui/system"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CoinList } from "../config/config"
import { CryptoState } from "../CryptoContext"
import CustomPagination from "./CustomPagination"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "gold",
  color: "black",
  fontWeight: 800,
}))

const CurrencyPrices = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const { currency } = CryptoState()
  const navigate = useNavigate()

  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: "compact",
  })
  const StandarFormat = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  })
  const handleSearch = () => {
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    )
  }
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(CoinList(currency, page))
      setData(data)
    }
    fetchData()
  }, [currency, page])
  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <Typography variant="h4" fontWeight={100} textAlign="center" py={4}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          id="outlined-basic"
          label="Search For a Crypto Currency ..."
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        <TableContainer style={{ marginTop: "30px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Coin</StyledTableCell>
                <StyledTableCell align="right" style={{ width: 180 }}>
                  Price
                </StyledTableCell>
                <StyledTableCell align="right" style={{ width: 180 }}>
                  24H Change
                </StyledTableCell>
                <StyledTableCell align="right" style={{ width: 180 }}>
                  Market CAP
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, page * 10)
                .map((coin) => {
                  return (
                    <TableRow
                      key={coin.id}
                      onClick={() => navigate(`/coins/${coin.id}`)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src={coin.image}
                          style={{ width: "60px", marginRight: "10px" }}
                          alt={coin.name}
                        />
                        <Box>
                          <Typography variant="h6" fontWeight={800}>
                            {coin.symbol.toUpperCase()}
                          </Typography>
                          <Typography fontWeight={100}>{coin.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {StandarFormat.format(coin.current_price)}
                      </TableCell>
                      <TableCell align="right">
                        {coin.market_cap_change_percentage_24h > 0 ? (
                          <span style={{ color: "green" }}>
                            +{coin.market_cap_change_percentage_24h.toFixed(2)}{" "}
                            %
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {coin.market_cap_change_percentage_24h.toFixed(2)} %
                          </span>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {formatter.format(coin.market_cap)}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          page={page}
          setPage={setPage}
          numOfPages={handleSearch().length / 10}
        />
      </ThemeProvider>
    </Container>
  )
}

export default CurrencyPrices
