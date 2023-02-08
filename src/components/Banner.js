import { Typography } from "@mui/material"
import React from "react"
import { makeStyles } from "tss-react/mui"
import Carousel from "./Carousel"

const useStyles = makeStyles()((theme) => {
  return {
    banner: {
      backgroundImage: "url(./banner.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      paddingBlock: "30px",
    },
    title: {
      fontWeight: 800,
      textAlign: "center",
      paddingBottom: "10px",
    },
    subtitle: {
      textAlign: "center",
      paddingBottom: "30px",
      fontWeight: 100,
    },
  }
})

const Banner = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.banner}>
      <Typography className={classes.title} variant="h2">
        Crypto Tracker
      </Typography>
      <Typography className={classes.subtitle} variant="body2">
        Get All The Info Regarding Your Favorite Crypto Currency
      </Typography>
      <Carousel />
    </div>
  )
}

export default Banner
