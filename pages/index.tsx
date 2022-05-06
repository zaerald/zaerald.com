import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/Header'

import profilePic from '@/public/images/profile.jpg'
import Github from '@/public/images/github.svg'
import Twitter from '@/public/images/twitter.svg'
import Linkedin from '@/public/images/linkedin.svg'

const Home: NextPage = () => {
  const socialLogoClasses = 'w-6 h-6 lg:w-8 md:h-8 fill-current text-white opacity-70 hover:opacity-100'
  const socials = [
    {
      name: 'GitHub',
      link: 'https://github.com/zaerald',
      component: <Github className={socialLogoClasses} />,
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/zaerald',
      component: <Twitter className={socialLogoClasses} />,
    },
    {
      name: 'Linkedin',
      link: 'https://www.linkedin.com/in/zaerald-denze-lungos',
      component: <Linkedin className={socialLogoClasses} />,
    },
  ]

  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-full h-screen">
        <main className="w-4/5 mx-auto text-center md:w-3/5 lg:w-2/5">
          <div className="w-3/5 mx-auto mb-2 md:w-2/6 lg:w-2/6">
            <Image
              src={profilePic}
              alt="Picture of Zaerald"
              layout="responsive"
              width={180}
              height={180}
              className="rounded-full"
            />
          </div>
          <p className="text-3xl sm:text-3xl md:mb-2">
            Yo! I&apos;m{' '}
            <Link href="https://en.wikipedia.org/wiki/Daemon_(computing)">
              <a
                className="inline-block text-white leading-5 border-b-8 border-accent hover:border-accent-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                zaerald
              </a>
            </Link>
          </p>
          <p className="text-secondary-200">I&apos;m a daemon process</p>

          <div className="flex justify-center mt-3 md:mt-4">
            {socials.map(({ component, link, name }) => (
              <Link key={name} href={link}>
                <a target="_blank" rel="noopener noreferrer" className="mx-3 md:mx-4">
                  {component}
                </a>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
