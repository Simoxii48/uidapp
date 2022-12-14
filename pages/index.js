import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import tw from "tailwind-styled-components"
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <Container>

      <Head>
        <title>Test UI DAPP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script 
        id="tailwind"
        src="https://cdn.tailwindcss.com"
      />

      <Header />
      <Main />
      <Footer />

    </Container>
  )
}

const Container = tw.div`
bg-black
w-screen
h-screen
text-white
px-7
`


