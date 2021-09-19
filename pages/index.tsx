import type {NextPage} from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zaerald</title>
        <meta name="description" content="Zaerald's Personal Website"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <h1>Yo! I'm zaerald</h1>
        <p>I'm a daemon process.</p>
      </main>
    </div>
  )
}

export default Home
