import { Avatar, Box, Typography, styled } from '@mui/material'

import BotHead from "../../../assets/images/BotHead.svg"




const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  margin:'5px 0',
  "& .MuiAvatar-root": {
    width: 30, height: 30, 
    backgroundColor: theme.palette.grey[400], 
    padding: '5px', color: 'common.black', 
    fontWeight: '500'
  },
  "& .MuiTypography-root": {
    padding:theme.spacing(1.1)
  }
}));

export default function Message({ message }) {

  const BotStyle = {
    flexDirection: 'row-reverse',
    padding: '5px 0 5px 35px',

    "& .MuiTypography-root": {
      borderRadius: "15px 0 15px 15px",
      bgcolor: "secondary.main"
    }
  }


  const userStyle = {
    "& .MuiTypography-root": {
      borderRadius: "0 15px 15px 15px",
      bgcolor: "info.light"
    }
  }

  return (
    <MessageBox sx={message.role === 'assistant' ? BotStyle : userStyle}>
      <Avatar src={message.role === 'assistant' ? BotHead : ""}
        slotProps={{
            img: {
              style: {
                filter: 'invert(100%)'
              }
            }}} >U</Avatar>
      <Typography>
        {message.content}
      </Typography>
    </MessageBox>
  )
}
