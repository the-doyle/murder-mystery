import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LoginPage = () => {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState()
	const router = useRouter()

    if (!user)
		return (
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<Auth
						redirectTo="http://localhost:3000/"
						appearance={{ theme: ThemeSupa }}
						supabaseClient={supabase}
						// providers={['google', 'github']}
						// socialLayout="horizontal"
						/>
					</div>
				</div>
			</div>
		)

	router.push('/')

	return (
		<div className='container'>
			<div className='row'>
				<div className='col text-center my-5'>
					<h4 className='text-success'>Welcome, {user.email}</h4>
					<Link className='btn btn-outline-dark' href='/dashboard'>Go to dashboard</Link>

				</div>
			</div>
		</div>
	)
}

export default LoginPage