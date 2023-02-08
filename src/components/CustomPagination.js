import { Pagination } from "@mui/material"
import { Box, Stack } from "@mui/system"
import React from "react"

const CustomPagination = ({ page, setPage, numOfPages }) => {
  const handleChange = (e, value) => {
    setPage(value)
  }
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", paddingBlock: "30px" }}
    >
      <Stack spacing={2}>
        <Pagination
          count={numOfPages}
          hidePrevButton
          hideNextButton
          onChange={handleChange}
        />
      </Stack>
    </Box>
  )
}

export default CustomPagination
