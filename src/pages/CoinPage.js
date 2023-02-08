import { Button, LinearProgress, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { makeStyles } from "tss-react/mui"
import { CustomChart } from "../components"
import { HistoricalChart, SingleCoin } from "../config/config"
import { CryptoState } from "../CryptoContext"
import parse from "html-react-parser"

const useStyles = makeStyles()((theme) => {
  return {
    sideBar: {
      width: "30%",
      padding: "20px",
      borderRight: "2px solid gray",
      "@media(max-width:991px)": {
        width: "100%",
        borderRight: "none",
        borderBottom: "2px solid gray",
      },
    },
    content: {
      width: "70%",
      padding: "40px 20px 0",
      "@media(max-width:991px)": {
        width: "100%",
      },
    },
    sub: {
      fontWeight: 100,
    },
    btn: {
      width: "calc(95%/4)",
      border: "1px solid gold",
      color: "gold",
      marginInline: ".5%",
      "&:hover": {
        backgroundColor: "black",
        color: "gold",
      },
    },
    active: {
      backgroundColor: "gold",
      color: "black",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
    },
  }
})

const CoinPage = () => {
  const param = useParams()
  const [coin, setCoin] = useState()
  const [timeChart, setTimeChart] = useState("1")
  const [activeButton, setActiveButton] = useState("1")
  const [chartData, setChartData] = useState([])
  const { currency } = CryptoState()
  const fetchDataCoin = async () => {
    const { data } = await axios.get(SingleCoin(param.id))
    setCoin(data)
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: "compact",
  })

  const fetchChart = async () => {
    const { data } = await axios.get(
      HistoricalChart(param.id, timeChart, currency)
    )
    setChartData(data.prices)
  }

  const hoursFormat = (time) => {
    const date = new Date(time)
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
    const hours = dateFormatter.format(date)
    return hours
  }
  const dateFormat = (time) => {
    const date = new Date(time)
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    const hours = dateFormatter.format(date)
    return hours
  }

  useEffect(() => {
    fetchChart()
    fetchDataCoin()
    // eslint-disable-next-line
  }, [timeChart, currency])
  const handleClick = (e) => {
    setActiveButton(e.target.id)
    setTimeChart(e.target.value)
  }
  const { classes } = useStyles()
  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />
  }
  return (
    <div>
      <Stack direction={{ xs: "column", sm: "column", md: "row" }} spacing={2}>
        <div className={classes.sideBar}>
          <img
            src={coin?.image?.large}
            style={{ display: "block", margin: "0 auto" }}
            alt={coin?.id}
          />
          <Typography textAlign="center" fontWeight={800} py={2} variant="h2">
            {coin?.name}
          </Typography>
          <Typography variant="body1" fontWeight={100} textAlign="justify">
            {parse(`${coin?.description.en.split(". ")[0]}`)}
          </Typography>
          <Typography variant="h5" py={1} fontWeight={800}>
            Rank : <span className={classes.sub}>{coin?.market_cap_rank}</span>
          </Typography>
          <Typography variant="h5" py={1} fontWeight={800}>
            Current Price :{" "}
            <span className={classes.sub}>
              {formatter.format(coin?.market_data?.current_price[currency])}
            </span>
          </Typography>
          <Typography variant="h5" py={1} fontWeight={800}>
            Market CAP :{" "}
            <span className={classes.sub}>
              {formatter.format(coin?.market_data?.market_cap[currency])}
            </span>
          </Typography>
        </div>
        <div className={classes.content}>
          <CustomChart
            chartData={chartData}
            hoursFormat={hoursFormat}
            dateFormat={dateFormat}
            timeChart={timeChart}
          />
          <div className="buttons" style={{ paddingBlock: "20px" }}>
            <Button
              className={
                activeButton === "1"
                  ? `${classes.btn} ${classes.active}`
                  : `${classes.btn}`
              }
              value={1}
              id="1"
              onClick={handleClick}
            >
              24 Hours
            </Button>
            <Button
              className={
                activeButton === "2"
                  ? `${classes.btn} ${classes.active}`
                  : `${classes.btn}`
              }
              value={30}
              id="2"
              onClick={handleClick}
            >
              30 Days
            </Button>
            <Button
              className={
                activeButton === "3"
                  ? `${classes.btn} ${classes.active}`
                  : `${classes.btn}`
              }
              value={90}
              id="3"
              onClick={handleClick}
            >
              3 Monts
            </Button>
            <Button
              className={
                activeButton === "4"
                  ? `${classes.btn} ${classes.active}`
                  : `${classes.btn}`
              }
              value={365}
              id="4"
              onClick={handleClick}
            >
              1 Year
            </Button>
          </div>
        </div>
      </Stack>
    </div>
  )
}

export default CoinPage
