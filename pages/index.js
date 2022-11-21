import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from './Nav'
import Dashboard from './Dashboard'
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

      <main className='min-vh-100'>
        <Nav></Nav>
        {user
          ? <Dashboard></Dashboard>
          : <p className='my-3 text-center'>Welcome! Sign in to get started. </p>
        }
      </main>

      <footer className='container-fluid mt-5 border-top text-center text-muted'>
        <p className='my-3'>2022 | The Lodge at 1818 North</p>
      </footer>
    </div>
  )
}
