import { Button, colors, styled } from '@mui/material'
import RightArrow from '../../assets/images/RightArrow.png'


const ChatBtn = styled(Button)(({ theme }) => ({
  maxWidth: '300px',
  width: '60vw',
  margin: '20px 0',
  height: '50px',
  borderRadius: 25,
  boxShadow: theme.shadows[6],
  fontSize: 'clamp(1.3rem,3vw,30px)',
  fontWeight: 'bold',
  padding:'5px 35px 5px 5px',
  textShadow:'0 0 1px #555',
  color:theme.palette.primary.main,
  '&::before': {
    boxShadow: theme.shadows[6],
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    content: `""`,
    backgroundImage: `url(${RightArrow})`,
    backgroundPosition: 'bottom 50% left 55%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '40%',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    right: '-25px',
    border: '5px white solid',
  },
  '&:hover':{
    backgroundColor: theme.palette.info.light,

  },
  '&:hover::before':{
    backgroundColor: theme.palette.primary.light,

  }


}))


export default function ChatButton() {
  return (
    <ChatBtn color='info' variant='contained' >
      לצ'אט עם דוגבוט
    </ChatBtn>
  )
}
