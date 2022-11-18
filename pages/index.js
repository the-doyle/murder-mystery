import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import Nav from './nav'
import Dashboard from './dashboard'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {

  const user = useUser() 

  return (
    <div>
      <Head>
        <title>The Lodge</title>
        <meta name="description" content="The Lodge at 1818 North" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='vh-100'>
        <Nav></Nav>
        {user
          ? <Dashboard></Dashboard>
          : <p className='my-3 text-center'>Welcome! Sign in to get started. </p>
        }
      </main>

      <footer className={styles.footer}>
        <p>2022 Ben Doyle</p>
      </footer>
    </div>
  )
}
