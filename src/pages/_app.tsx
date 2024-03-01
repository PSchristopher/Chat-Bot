// pages/_app.tsx

import { AppProps } from 'next/app';
import RootLayout from '../app/layout';
import '../app/globals.css'; // Import your global styles here
import React, { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
const [isLoaded,setIsLoaded]=useState(false)

    useEffect(()=>{
        setIsLoaded(true)
      },[])
      if(!isLoaded){return null}
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
