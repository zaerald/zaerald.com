import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const baseLinkClasses = [
    'text-xl',
    'md:text-2xl',
    'lg:text-3xl',
    'border-b-8',
    'border-opacity-0',
    'hover:text-white',
    'hover:border-accent-hover',
  ].join(' ')

  const activeLinkClasses = ['text-white', 'border-accent-hover'].join(' ')

  const inactiveLinkClasses = ['text-secondary-200', 'border-transparent'].join(' ')

  const hiddenClass = open ? '' : 'hidden'

  return (
    <>
      <Head>
        <title>Zaerald</title>
        <meta name="description" content="Zaerald" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="fixed z-50 w-full px-4 py-3 bg-primary-400 md:px-8 md:py-4">
        <div className="flex flex-wrap items-center">
          <Link href="/">
            <a className="text-3xl text-accent hover:text-accent-hover">zaerald</a>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            data-collapse-toggle="menu"
            type="button"
            className="inline-flex items-center p-2 ml-auto text-gray-500 rounded-lg md:hidden hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-300"
            aria-controls="menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${open ? 'hidden' : ''} w-6 h-6`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`${hiddenClass} w-6 h-6`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className={`${hiddenClass} w-full mt-2 border-b-2 border-dashed border-accent md:block md:w-auto md:mt-0 md:ml-auto md:border-none`} id="menu">
            <ul className="md:flex md:w-full">
              <li className="my-2 md:mx-2">
                <Link href="/list">
                  <a
                    className={`bg-secondary ${baseLinkClasses} ${
                      router.pathname === '/list' ? activeLinkClasses : inactiveLinkClasses
                    }`}
                  >
                    list
                  </a>
                </Link>
              </li>
              <li className="my-2 md:mx-2">
                <Link href="/stats">
                  <a
                    className={`bg-secondary ${baseLinkClasses} ${
                      router.pathname === '/stats' ? activeLinkClasses : inactiveLinkClasses
                    }`}
                  >
                    stats
                  </a>
                </Link>
              </li>
              <li className="my-2 md:mx-2">
                <Link href="https://blog.zaerald.com">
                  <a
                    className={`${baseLinkClasses} ${inactiveLinkClasses}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
