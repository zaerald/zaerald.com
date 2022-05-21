import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import { useState, useEffect } from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import TagManager from 'react-gtm-module'

function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false)

  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER ?? '' })
  }, [])

  TopBarProgress.config({
    barColors: {
      '0': '#007acc',
      '1.0': '#007acc',
    },
    shadowBlur: 5,
  })

  Router.events.on('routeChangeStart', () => {
    setProgress(true)
  })

  Router.events.on('routeChangeComplete', () => {
    setProgress(false)
  })

  return (
    <>
      {progress && <TopBarProgress />}
      <Component {...pageProps} />
    </>
  )
}

export default App
