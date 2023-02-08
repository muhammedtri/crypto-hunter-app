import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Tab from "@mui/material/Tab"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { useState } from "react"
import { color, ThemeProvider } from "@mui/system"
import { TextField, createTheme, styled } from "@mui/material"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#424242",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
}

const CustomButton = styled(Button)({
  backgroundColor: "gold",
  color: "black",
  width: "100%",
  paddingBlock: "10px",
  "&:hover": {
    backgroundColor: "balck",
    color: "gold",
    border: "1px solid gold",
  },
})

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function LoginModel({ children }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("1")
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (e, nValue) => setValue(nValue)

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "error" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="LOGIN"
                    value="1"
                    style={{ width: "50%", color: "white" }}
                  />
                  <Tab
                    label="SIGN UP"
                    value="2"
                    style={{ width: "50%", color: "white" }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    id="outlined-basic"
                    label="Enter Email"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    id="outlined-basic"
                    label="Enter Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    style={{ margin: "15px 0" }}
                  />
                  <CustomButton>LOGIN</CustomButton>
                </ThemeProvider>
              </TabPanel>
              <TabPanel value="2">
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    id="outlined-basic"
                    label="Enter Email"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    id="outlined-basic"
                    label="Enter Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    style={{ margin: "15px 0" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    style={{ marginBottom: "15px" }}
                  />
                  <CustomButton>SIGN UP</CustomButton>
                </ThemeProvider>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
