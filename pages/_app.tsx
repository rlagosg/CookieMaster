import '@/styles/globals.css'
import type { AppContext, AppProps } from 'next/app'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { customTheme, darkTheme, lightTheme } from '@/theme';
import { Theme } from '@emotion/react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


interface Props extends AppProps{
  theme: string
}

export default function App({ Component, pageProps, theme = 'dark' }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme = cookieTheme === 'light'
        ? lightTheme
        : (cookieTheme === 'dark')
          ? darkTheme
          : customTheme;
    
    setCurrentTheme( selectedTheme );
  }, [])

  return (
  <ThemeProvider theme={currentTheme}>
    <CssBaseline/>
    <Component {...pageProps} />
  </ThemeProvider>
  );
}

// App.getInitialProps = async( appContext:AppContext ) => {
  
//   const { theme } = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { theme: 'light'};
  
//   const validTheme = ['light', 'dark', 'custom'];


//   return {
//     theme: validTheme.includes(theme) ? theme : 'light'      
//   }
// }
