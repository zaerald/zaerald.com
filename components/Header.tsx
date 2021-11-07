import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Header() {

  const router = useRouter();

  const baseLinkClasses = [
  'mt-3', 'text-xl', 'md:text-2xl', 'lg:text-3xl',
  'border-b-8', 'border-opacity-0',
  'hover:text-white', 'hover:border-accent-hover',
  ]

  const activeLinkClasses = ['text-white', 'border-accent-hover'].join(' ')
  const inactiveLinkClasses = ['text-secondary-200', 'border-transparent'].join(' ')

  return (
    <>
      <Head>
        <title>Zaerald</title>
        <meta name="description" content="Zaerald"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <header className="fixed w-full z-50 px-4 py-3 bg-primary-400 md:px-8 md:py-4">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-3xl text-accent hover:text-accent-hover">zaerald</a>
          </Link>
          <Link href="/list">
            <a className={`ml-auto bg-secondary ${baseLinkClasses.join(' ')} ${router.pathname === '/list' ? activeLinkClasses : inactiveLinkClasses}`}>
              list
            </a>
          </Link>
          <Link href="https://blog.zaerald.com">
            <a className={`ml-5 ${baseLinkClasses.join(' ')} ${inactiveLinkClasses}`}
              target="_blank"
              rel="noopener noreferrer">
              blog
            </a>
          </Link>
        </div>
      </header>
    </>
  )
}
