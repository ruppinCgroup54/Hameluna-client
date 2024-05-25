import { Avatar, Box, Button, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom';
import useLocalStorage from '../../../utilis/useLocalStorge';

const BotHead = "images/BotHead.svg"




const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  margin: '5px 0',
  "& .MuiAvatar-root": {
    width: 35, height: 35,
    backgroundColor: theme.palette.grey[400],
    padding: '5px',
    color: theme.palette.common.black,
    fontWeight: '500'
  },
  "& .MuiTypography-root": {
    padding: theme.spacing(1.1)
  }
}));

export default function Message({ message}) {

  const [id, setId] = useLocalStorage("_id");

  const BotStyle = {
    flexDirection: 'row-reverse',
    padding: '5px 0 5px 35px',

    "& .MuiTypography-root": {
      borderRadius: "15px 0 15px 15px",
      bgcolor: "secondary.main"
    }
  }


  const userStyle = {
    padding: '5px 35px 5px 0',
    "& .MuiTypography-root": {
      borderRadius: "0 15px 15px 15px",
      bgcolor: "info.light"
    }
  }

  return (
    <MessageBox sx={message.role?.toLowerCase() === 'assistant' ? BotStyle : userStyle}>
      <Avatar src={message.role?.toLowerCase() === 'assistant' ? BotHead : ""}
        slotProps={{
          img: {
            style: {
              filter: 'invert(100%)'
            }
          }
        }} >U</Avatar>
      <Typography>
        {message.content}
       {message.indFinish && <Link to={"/dogtinder/" + id.id} style={{display:'block',float:"left"}} ><Button variant='outlined'>לכל הכלבים</Button></Link>}
      </Typography>
    </MessageBox>
  )
}
