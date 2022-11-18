import Link from 'next/link'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function Nav() {

    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState()

    useEffect(() => {
        async function loadData() {
          const { data } = await supabaseClient.from('character').select('*')
          setData(data)
        }
        // Only run query once user is logged in.
        if (user) loadData()
      }, [user])

    if (!user)
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="#">The Lodge at 1818 North</Link>
                        <div className='d-flex'>
                            <Link className="nav-link" href="/LoginPage">Sign in</Link>
                        </div>
                    </div>
                </nav>
            </div>
        )

        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="#">The Lodge at 1818 North</Link>
                        <div className='d-flex'>
                            <button className='btn btn-sm btn-outline-dark' onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
                        </div>
                    </div>
                </nav>
            </div>
        )
}