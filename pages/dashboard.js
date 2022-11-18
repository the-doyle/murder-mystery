import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from './nav'

export default function Dashboard() {

    const supabase = useSupabaseClient()
    const user = useUser()
    const [characters, setCharacters] = useState([])
    const [player, setPlayer] = useState({'name': ''})

    useEffect(() => {
        async function loadCharacters() {
            try {
                const { data } = await supabase
                    .from('Character')
                    .select('*')
    
                if (data) {
                    setCharacters(data);
                    for (const character in data) {
                        if (data[character].email === user.email) {
                            setPlayer(data[character]);
                            break
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
            // Only run query once user is logged in.
            if (user) {
                loadCharacters();
            }
        }, [user])

    return (
        <div className='vh-100'>
            <Nav></Nav>
            <div className='container-fluid'>
                <div className='row my-2'>
                    <div className='col'>
                        <h3 className='text-dark'>{player.name}</h3>
                    </div>
                </div>

                <div className='row my-2'>
                    
                </div>
            </div>
        </div>
    )
}