import React, {useEffect, useState} from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Backdrop from "@mui/material/Backdrop"

interface Props  {
  text?: string
  open: boolean
}
const Loading: React.FC<Props> = ({text = "Loading", open}) => {
  const [dots, setDots] = useState<string>("")
  useEffect(() => {
    const timeInterval = setInterval(() => {
      if(dots === "...") {
        setDots("")
      } else {
        setDots(prev => {
          return prev + "."
        })
      }
    }, 300)
    return () => {
      clearInterval(timeInterval)
    }
  }, [dots])
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Paper sx={{
          p: 3,
          width: "200px"
        }}>
          <Stack direction="row" gap={4} alignItems="center">
            <CircularProgress color="info" />
            <p>{text} {dots}</p>
          </Stack >
        </Paper >
      </Backdrop>
    </div>
  )
}

export default Loading
