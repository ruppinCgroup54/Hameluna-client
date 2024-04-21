import LogInImage from '../../assets/images/Layouts/LogIn.png'
import BackgroundLayout from '../../layouts/BackgroundLayout'
import Logo from '../../components/Logo'

import { useMediaQuery } from 'react-responsive'
import { useTheme } from '@mui/material/styles'

const phoneStyle = {
  width: '90%',
  margin: 'auto'
}
const desktopStyle = { width: '33%', marginRight: '10%' };


export default function LogInPage() {

  const isDesktop = useMediaQuery({ query: '(min-width:992px )' })

  const theme = useTheme();

  return (
    <BackgroundLayout image={LogInImage}>
      <div style={{padding:'50px 0 ', ...isDesktop ? desktopStyle : phoneStyle  }}>
        <Logo.Full />
        <h3>לנהל את הכלבייה שלך בצורה הפשוטה ביותר.</h3>

      </div>
    </BackgroundLayout>
  )
}
