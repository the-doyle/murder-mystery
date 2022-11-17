import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import {Nav, Dashboard} from './'

export default function Home() {
  return (
    <div>
      <Head>
        <title>The Lodge</title>
        <meta name="description" content="The Lodge at 1818 North" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
      </Head>

      <main>
        <Nav></Nav>
        <Dashboard message="Welcome to 1818 North"></Dashboard>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></Script>
      </main>

      <footer className={styles.footer}>
        <p>2022 Ben Doyle</p>
      </footer>
    </div>
  )
}
