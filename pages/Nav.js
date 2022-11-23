import Link from 'next/link'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Nav() {

    const user = useUser()
    const supabase = useSupabaseClient()
    const router = useRouter()

    function signOut() {
        supabase.auth.signOut()
    }

    if (!user)
        return (
            <div>
                <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="/">The Lodge at 1818 North</Link>
                        <div className='d-flex'>
                            <Link className="btn btn-sm btn-outline-light" href="/LoginPage">Sign in</Link>
                        </div>
                    </div>
                </nav>
            </div>
        )

        return (
            <div>
                <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="/">The Lodge at 1818 North</Link>
                        <div className='d-flex'>
                            <button className='btn btn-sm btn-outline-light' onClick={() => signOut()}>Sign out</button>
                        </div>
                    </div>
                </nav>
            </div>
        )
}