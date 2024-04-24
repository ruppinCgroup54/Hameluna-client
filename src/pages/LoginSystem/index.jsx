import LogInImage from '../../assets/images/Layouts/LogIn.png'
import BackgroundLayout from '../../layouts/BackgroundLayout'
import Logo from '../../components/Logo'

import { useMediaQuery } from 'react-responsive'
import { useTheme } from '@mui/material/styles'
import { TextField } from '@mui/material'
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const phoneStyle = {
  width: '90%',
  margin: 'auto'
}
const desktopStyle = { width: '33%', marginRight: '10%' };


export default function LogInPage() {

  const isDesktop = useMediaQuery({ query: '(min-width:992px )' })

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = useTheme();

  return (
    <>
      <BackgroundLayout image={LogInImage}>
        <div style={{ padding: '50px 0', backgroundImage: 'radial-gradient( #8C6849 0%, #8C6849 23%,  rgba(140, 104, 73, 0) 100%)', ...isDesktop ? desktopStyle : phoneStyle }}>
          <Logo.Full />
          <h3 style={{ color: 'white', marginTop: '5px' }}>לנהל את הכלבייה שלך בצורה הפשוטה ביותר.</h3>
          <CacheProvider value={cacheRtl}>
            <div dir='rtl'>
              <TextField id="filled-basic" label="Outlined" variant="filled" style={{ backgroundColor: 'rgb(255,255,255,0.7)', borderRadius: '10px' }} /> <br/><br/>
              <TextField id="filled-basic" label="אימייל או שם משתמש" variant="filled" required style={{ backgroundColor: 'rgb(255,255,255,0.7)', borderRadius: '10px 10px 0px 0px' }} /> <br /> <br />
              <TextField id="filled-basic" label="סיסמה" variant="filled" required style={{ backgroundColor: 'rgb(255,255,255,0.7)', borderRadius: '10px 10px 0px 0px' }} />
            </div>
          </CacheProvider>
        </div>
      </BackgroundLayout>
      <br/><br/><TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{borderColor:'red'}} />

    </>
  )
}
