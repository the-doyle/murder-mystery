import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const LoginPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState()

    useEffect(() => {
      async function loadData() {
        const { data } = await supabaseClient.from('test').select('*')
        setData(data)
      }
      // Only run query once user is logged in.
      if (user) loadData()
    }, [user])

    if (!user)
		return (
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<Auth
						redirectTo="http://localhost:3000/"
						appearance={{ theme: ThemeSupa }}
						supabaseClient={supabaseClient}
						// providers={['google', 'github']}
						// socialLayout="horizontal"
						/>
					</div>
				</div>
			</div>
		)

	return (
		<div className='container'>
			<div className='row'>
				<div className='col'>
					<h3 className='text-success text-center'>Welcome, {user.email}</h3>
					<Link className='btn btn-outline-dark' href='/dashboard'>Player Dashboard</Link>

				</div>
			</div>
		</div>
	)
}

export default LoginPage