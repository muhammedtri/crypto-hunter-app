import axios from "axios"
import React, { useEffect, useState } from "react"
import { TrendingCoins } from "../config/config"
import { CryptoState } from "../CryptoContext"
import AliceCarousel from "react-alice-carousel"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => {
  return {
    img: {
      width: "80px",
      marginBottom: "10px",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    percent: {
      color: "red",
      marginInline: "5px",
    },
    price: {
      fontWeight: 800,
      fontSize: "20px",
      padding: "10px 0",
    },
  }
})

const Carousel = () => {
  const { currency, symbol } = CryptoState()
  const [trendingCoins, setTrendingCoins] = useState()
  const { classes } = useStyles()

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(TrendingCoins(currency))
      setTrendingCoins(data)
    }
    fetchTrending()
  }, [currency])
  const items =
    trendingCoins &&
    trendingCoins.map((c) => (
      <div key={c.id} className={classes.card}>
        <img src={c.image} alt={c.name} className={classes.img} />
        <div>
          <span>{c.symbol.toUpperCase()}</span>
          <span>
            {c.market_cap_change_percentage_24h > 0 ? (
              <span style={{ color: "green" }}>
                +{c.market_cap_change_percentage_24h.toFixed(2)} %
              </span>
            ) : (
              <span style={{ color: "red" }}>
                {c.market_cap_change_percentage_24h.toFixed(2)} %
              </span>
            )}
          </span>
        </div>
        <span className={classes.price}>
          {symbol} {c.current_price}
        </span>
      </div>
    ))
  const responsive = {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    900: {
      items: 4,
    },
  }
  return (
    <div>
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={1000}
        infinite
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        paddingLeft={40}
        paddingRight={40}
        responsive={responsive}
      />
    </div>
  )
}

export default Carousel
