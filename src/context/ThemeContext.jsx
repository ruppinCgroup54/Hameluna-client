import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

export default function ThemeContext({children}) {


  const theme = createTheme({
    palette: {
      primary: {
        main: '#8c6849',
      },
      secondary: {
        main: 'rgba(131,140,59,0.4)',

      },

    },
    typography:{
      fontFamily:"'Varela round',san-sarif"
    }
  })


  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      {children}

    </ThemeProvider>

  )
}
